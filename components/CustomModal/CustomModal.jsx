import IconClose from "../Icons/IconClose";

/**
 * @method: handleModalClick
 * @description: If user click outside the modal, the modal will be closed.
 */
const handleModalClick = (event, handleOnClose) => {
    event.stopPropagation();
    if (handleOnClose) {
        // event.preventDefault can not be written outside as it will cause issues with modals that are using formik submit.
        event.preventDefault();
        handleOnClose();
    }
};

export const CustomModal = ({
    children,
    handleOnClose,
    className
}) => {
    return (
        <div
            className="modalOverlay flex justify-center flex-center"
            onClick={(event) => {
                handleModalClick(event, handleOnClose);
            }}
        >
            <div
                className={`modal ${className}`}
                onClick={(event) => {
                    handleModalClick(event);
                }}
            >
                {children}
            </div>
        </div>
    )
}

export const ModalHeader = ({ children, title, handleOnClose }) => {
    return (
        <div className="modal-header flex Space-between flex-center">
            {title &&
                <h5 className="modal-title">{title}</h5>
            }
            {handleOnClose &&
                <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={(e) => {e.preventDefault();handleOnClose()}}
                >
                    <span aria-hidden="true">
                        <IconClose />
                    </span>
                </button>
            }
            {children}
        </div>
    );
}

export const ModalContent = ({ children }) => {
    return (
        <div className="modal-body">
            {children}
        </div>
    )
}

export const ModalFooter = ({ children }) => {
    return (
        <div className="modal-footer">
            <div className="flex space-between btn-wrap">
                {children}
            </div>
        </div>
    )
}
