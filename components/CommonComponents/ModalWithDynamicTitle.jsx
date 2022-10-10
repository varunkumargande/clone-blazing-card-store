import React from "react";
import Link from "next/link";
import IconClose from "../Icons/IconClose";
import IconGoogle from "../Icons/IconGoogle";

export default function DynamicModal(props) {
    const {
        title
    } = props;
    return (
        <div className="modalOverlay flex justify-center flex-center">
            <div className="modal">
                <div className="modal-header flex Space-between flex-center nobg">
                    <h5 className="modal-title"></h5>
                    <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">
                            <IconClose />
                        </span>
                    </button>
                </div>
                <div className="modal-body text-center">
                    <div className="Stream-title text-center mb24">
                        {title}
                    </div>
                    <button className="google-btn mb24">
                        <IconGoogle />
                        Continue with Google
                    </button>
                    <div class="or mb32 flex flex-center justify-center">
                        <span>Or</span>
                    </div>
                    <div className="signin-signup">
                        <Link href="/account/register">
                            <a>Sign Up</a>
                        </Link>
                        /
                        <Link href="/account/login">
                            <a>Sign In</a>
                        </Link>{" "}
                        on Blazing Cards
                    </div>
                </div>
            </div>
        </div>
    );
}