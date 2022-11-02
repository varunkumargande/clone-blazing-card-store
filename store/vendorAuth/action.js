import { vendorAuthApi } from "../../api/auth/vendorAuth";

export function vendorAuth() {
    return() => {
        vendorAuthApi()
    }
}
