import '../pages/admin/ManageStudents.css'; // Reusing modal styles

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Confirm', cancelText = 'Cancel', isDangerous = false }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button className="close-btn" onClick={onCancel}>&times;</button>
                </div>
                <div className="modal-body">
                    <p>{message}</p>
                </div>
                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onCancel}>
                        {cancelText}
                    </button>
                    <button
                        className={`save-btn ${isDangerous ? 'danger' : ''}`}
                        onClick={onConfirm}
                        style={isDangerous ? { backgroundColor: '#dc2626' } : {}}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
