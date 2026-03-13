// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title TimeSeal - Crypto Time Capsule
 * @notice Allows users to lock encrypted messages and optional ETH for a recipient to open after a specified unlock date.
 * @dev Deployable on EVM chains (e.g., Base). Uses OpenZeppelin's ReentrancyGuard for security.
 */
contract TimeSeal is ReentrancyGuard {
    /// @notice Emitted when a new capsule is created
    event CapsuleCreated(
        uint256 indexed capsuleId,
        address indexed sender,
        address indexed recipient,
        uint256 unlockTimestamp,
        uint256 ethAmount,
        string theme,
        bool isPublic
    );

    /// @notice Emitted when a capsule is opened by the recipient
    event CapsuleOpened(
        uint256 indexed capsuleId,
        address indexed recipient,
        uint256 ethAmount,
        uint256 openedAt
    );

    /// @notice Emitted when ETH is added to an existing, unopened capsule
    event ETHAdded(
        uint256 indexed capsuleId,
        address indexed sender,
        uint256 amount
    );

    /// @notice Struct representing a time capsule
    struct Capsule {
        uint256 capsuleId;
        address sender;
        address recipient;
        string encryptedMessage;
        uint256 unlockTimestamp;
        uint256 ethAmount;
        string theme;
        bool isOpened;
        bool isPublic;
        uint256 createdAt;
    }

    /// @dev Auto-incrementing capsule ID counter
    uint256 private _nextCapsuleId = 1;

    /// @dev Mapping from capsule ID to Capsule struct
    mapping(uint256 => Capsule) private _capsules;

    /// @dev Mapping from recipient address to their capsule IDs
    mapping(address => uint256[]) private _capsulesByRecipient;

    /// @dev Mapping from sender address to their capsule IDs
    mapping(address => uint256[]) private _capsulesBySender;

    /// @dev Array of all public capsule IDs
    uint256[] private _publicCapsuleIds;

    /**
     * @notice Create a new time capsule with an encrypted message and optional ETH.
     * @param recipient The address that can open the capsule after unlock time.
     * @param encryptedMessage The encrypted message string.
     * @param unlockTimestamp The UNIX timestamp when the capsule can be opened (≥1 hour in future).
     * @param theme The theme of the capsule (e.g., Birthday, Milestone, Future Self, Legacy).
     * @param isPublic Whether the capsule is publicly visible.
     * @dev ETH can be sent with this call. Capsule IDs auto-increment.
     * Emits CapsuleCreated.
     */
    function createCapsule(
        address recipient,
        string calldata encryptedMessage,
        uint256 unlockTimestamp,
        string calldata theme,
        bool isPublic
    ) external payable {
        require(recipient != address(0), "Recipient cannot be zero address");
        require(bytes(encryptedMessage).length > 0, "Message required");
        require(
            unlockTimestamp >= block.timestamp + 1 hours,
            "Unlock time must be at least 1 hour in the future"
        );

        uint256 capsuleId = _nextCapsuleId++;
        uint256 ethAmount = msg.value;

        Capsule memory newCapsule = Capsule({
            capsuleId: capsuleId,
            sender: msg.sender,
            recipient: recipient,
            encryptedMessage: encryptedMessage,
            unlockTimestamp: unlockTimestamp,
            ethAmount: ethAmount,
            theme: theme,
            isOpened: false,
            isPublic: isPublic,
            createdAt: block.timestamp
        });

        _capsules[capsuleId] = newCapsule;
        _capsulesByRecipient[recipient].push(capsuleId);
        _capsulesBySender[msg.sender].push(capsuleId);

        if (isPublic) {
            _publicCapsuleIds.push(capsuleId);
        }

        emit CapsuleCreated(
            capsuleId,
            msg.sender,
            recipient,
            unlockTimestamp,
            ethAmount,
            theme,
            isPublic
        );
    }

    /**
     * @notice Open a capsule after its unlock time. Only the designated recipient can open.
     * @param capsuleId The ID of the capsule to open.
     * @dev Transfers any ETH in the capsule to the recipient and marks it as opened.
     * Emits CapsuleOpened. Uses nonReentrant modifier.
     */
    function openCapsule(uint256 capsuleId) external nonReentrant {
        Capsule storage capsule = _capsules[capsuleId];
        require(capsule.capsuleId != 0, "Capsule does not exist");
        require(msg.sender == capsule.recipient, "Not capsule recipient");
        require(!capsule.isOpened, "Capsule already opened");
        require(
            block.timestamp >= capsule.unlockTimestamp,
            "Capsule not yet unlockable"
        );

        capsule.isOpened = true;

        uint256 ethAmount = capsule.ethAmount;
        if (ethAmount > 0) {
            capsule.ethAmount = 0;
            (bool sent, ) = capsule.recipient.call{value: ethAmount}("");
            require(sent, "ETH transfer failed");
        }

        emit CapsuleOpened(capsuleId, capsule.recipient, ethAmount, block.timestamp);
    }

    /**
     * @notice Add ETH to an existing, unopened capsule.
     * @param capsuleId The ID of the capsule to top up.
     * @dev Anyone can add ETH before the capsule is opened.
     * Emits ETHAdded.
     */
    function addETHToCapsule(uint256 capsuleId) external payable {
        Capsule storage capsule = _capsules[capsuleId];
        require(capsule.capsuleId != 0, "Capsule does not exist");
        require(!capsule.isOpened, "Capsule already opened");
        require(msg.value > 0, "No ETH sent");

        capsule.ethAmount += msg.value;

        emit ETHAdded(capsuleId, msg.sender, msg.value);
    }

    /**
     * @notice Get all capsule IDs for a recipient address.
     * @param recipient The address whose received capsules to fetch.
     * @return capsuleIds Array of capsule IDs for the recipient.
     */
    function getCapsulesByRecipient(address recipient) external view returns (uint256[] memory capsuleIds) {
        return _capsulesByRecipient[recipient];
    }

    /**
     * @notice Get all capsule IDs sent by a sender address.
     * @param sender The address whose sent capsules to fetch.
     * @return capsuleIds Array of capsule IDs sent by the sender.
     */
    function getCapsulesBySender(address sender) external view returns (uint256[] memory capsuleIds) {
        return _capsulesBySender[sender];
    }

    /**
     * @notice Get all public capsule IDs.
     * @return capsuleIds Array of all public capsule IDs.
     */
    function getPublicCapsules() external view returns (uint256[] memory capsuleIds) {
        return _publicCapsuleIds;
    }

    /**
     * @notice Get the number of seconds until a capsule unlocks.
     * @param capsuleId The ID of the capsule.
     * @return secondsRemaining Seconds until unlock (0 if already unlockable).
     */
    function getTimeUntilUnlock(uint256 capsuleId) external view returns (uint256 secondsRemaining) {
        Capsule storage capsule = _capsules[capsuleId];
        require(capsule.capsuleId != 0, "Capsule does not exist");
        if (block.timestamp >= capsule.unlockTimestamp) {
            return 0;
        }
        return capsule.unlockTimestamp - block.timestamp;
    }

    /**
     * @notice Returns true if the capsule is unlockable (current time >= unlockTimestamp).
     * @param capsuleId The ID of the capsule.
     * @return unlockable True if unlockable, false otherwise.
     */
    function isUnlockable(uint256 capsuleId) external view returns (bool unlockable) {
        Capsule storage capsule = _capsules[capsuleId];
        require(capsule.capsuleId != 0, "Capsule does not exist");
        return block.timestamp >= capsule.unlockTimestamp && !capsule.isOpened;
    }

    /**
     * @notice Get the full details of a capsule.
     * @param capsuleId The ID of the capsule.
     * @return capsule Capsule struct.
     * @dev Public for convenience; only encryptedMessage is stored.
     */
    function getCapsule(uint256 capsuleId) external view returns (Capsule memory capsule) {
        require(_capsules[capsuleId].capsuleId != 0, "Capsule does not exist");
        return _capsules[capsuleId];
    }

    // --- Fallbacks ---

    receive() external payable {
        revert("Direct ETH not accepted");
    }

    fallback() external payable {
        revert("Invalid call");
    }
}
