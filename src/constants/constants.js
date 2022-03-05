const responseMessages = {
  EN: {
    AUTHORIZATION_BEARER_TOKEN_TITLE: "Authorize bearer token",
    AUTHORIZATION_BEARER_TOKEN: "INVAILD AUTHORIZATION TOKEN SUPPLIED",
    UNKNOWN_ERROR: "Unknown error.",
    SUCCESS: "Success",
    FAILURE: "Failure",
    UNAUTHORIZED: "Uauthorized",
    USERNAME_PASSWORD_INVALID: "Invalid email or password",
    VALIDATION_ERROR: "Validation Errors.",
    VALIDATION_SUCCESS: "Validation Success.",
    VALIDATION_FAILURE: "Validation failed.",
    NOT_ALLOWED: "Not allowed to update this data",
    SOMETHING_WENT_WRONG: "Something went wrong. Please try again later.",
    SOMETHING_WENT_WRONG_WITH_DB_CONNECTION:
      "Something went wrong with db connection. Please try again later.",
    BAD_REQUEST:
      "Something went wrong with requested url. Please try again later.",
    TOKEN_IS_VALID: "Valid token",
    LOGIN_TITLE: "Login",
    ACCOUNT_DISABLED_TITLE: "Account Disabled",
    LOGIN_SUCCESS_MESSAGE: "Logged in successfully",
    INACTIVE_USER: "Account is disabled or deactivated. Please contact admin.",
    LOGIN_FAILURE_MESSAGE: "Login failed",
    CREDIENTIAL_FAILED: "Email/Password is invalid. Please try again.",
    ACCOUNT_DISABLED:
      "Your account has been disabled .To reactivate your account, please contact TipQuick Support at support@tipquick.com",
    ADMIN_VERIFICATION_PENDING:
      "Your account is under review by TipQuick.Please contact TipQuick Support at support@tipquick.com for further support.",
    ACCOUNT_NOT_VERIFIED_ADMIN:
      "An account for this email exists but isn't verified. Please verify your email.",
    ACCOUNT_NOT_VERIFIED:
      "An account for this email exists but isn't verified. Would you like us to resend the verification mail?",
    INVALID_DATA: "Invalid data",
    REGISTRATION_TITLE: "Sign up",
    // REGISTRATION_SUCCESS_MESSAGE: 'Your account is registered successfully. Please follow the instruction in the email to verify your account.',
    REGISTRATION_SUCCESS_MESSAGE:
      "Your account has been created successfully! \n Please check your email and follow the links provided to verify your details.",
    EMAIL_ALREADY_TAKEN: "Email is already in use.",
    EMAIL_NOT_TAKEN: "Email is not in use.",
    USER_NOT_FOUND:
      "We are unable to find any account associated with this email.",
    EMAIL_EXIST_TITLE: "Email Exist",

    FORGOT_PASSWORD_TITLE: "Forgot password",
    FORGOT_PASSWORD_SUCCESS_MESSAGE:
      "Password reset link sent successfully. Please check your inbox.",
    FORGOT_PASSWORD_FAILURE_MESSAGE: "Forgot password failed",

    RESEND_LINK_TITLE: "Resend lik",
    RESEND_LINK_ALREADY_VERIFIED: "Your email is already verified",
    RESEND_LINK_SUCCESS_MESSAGE:
      "Verification link sent successfully. Please check your inbox.",
    RESEND_LINK_FAILURE_MESSAGE: "Verification link error",

    RESET_PASSWORD_TITLE: "Reset password",
    RESET_PASSWORD_SUCCESS_MESSAGE: "Password changed successfully.",
    RESET_PASSWORD_FAILURE_MESSAGE: "Forgot password failed",
    TOKEN_EXPIRED_OR_INVALID_MESSAGE: "Expired/Invalid Token",
    TOKEN_EXPIRED_MESSAGE: "Token expired",
    CHANGE_PASSWORD: "Change password",
    PASSWORD_NOT_MATCH: "Old password does not match",

    REFRESH_TOKEN_TITLE: "Refresh token",
    INVALID_REFRESH_TOKEN:
      "Invalid refresh token. Please try again with valid token",
    REFRESH_TOKEN_SUCCESS_MESSAGE: "Access token refreshed successfully",

    LOGOUT_TITLE: "Logout",
    LOGOUT_FAILURE_MESSAGE: "Could not log out. Please try again later",
    LOGOUT_SUCCESS_MESSAGE: "Logged out successfully",
    DEVICE_NOT_FOUND: "Device not found",

    DEACTIVATE_TITLE: "Deactivate",
    DEACTIVATE_FAILURE_MESSAGE: "Could not deactivate. Please try again later",
    DEACTIVATE_SUCCESS_MESSAGE:
      "Sorry to see you go, please remember to cancel your subscription via your AppStore account.",

    APPLE_LOGIN_TITLE: "Login with Apple",
    INVALID_AUTHORIZATION_CODE: "Invalid authorization code",

    PHONE_ALREADY_TAKEN: "Phone number is already in use.",

    // Legals

    LEGAL_TITLE: "Legal",
    LEGAL_UPDATE_SUCCESS: "Legal updated successfully.",

    // Pages
    PAGE_SUCCESS: "Page found",
    PAGE_ERROR: "Page not found",
    PAGE_ERROR_EXCEPTION: "Page cannot be found due to exception",
    SUBJECT_TITLE: "Subject",
    SUBJECT_LIST_SUCCESS_MESSAGE: "Subject listed successfully",
    PAGE_UPDATE_SUCCESS: "Page updated successfully.",
    PAGE_TITLE: "Public pages",
    PAGE_UPDATE_FAILUE: "Page can't be updated.",
    NO_RECORD_FOUND: "No record found.",

    // Customer
    CUSTOMER_SUCCESS: "Customer found",
    CUSTOMER_ERROR: "Customer not found",

    // Topic
    TOPIC_SUCCESS: "Topic found",
    TOPIC_ERROR: "Topic not found",
    TOPIC_ERROR_EXCEPTION: "Topic cannot be found due to exception",
    TOPIC_UPDATE_SUCCESS: "Topic updated successfully.",
    TOPIC_TITLE: "Topic",
    TOPIC_UPDATE_FAILUE: "Topic can't be updated.",

    // Merchant Settings
    MERCHANT_SETTINGS_SUCCESS: "Merchant settings found",
    MERCHANT_SETTINGS_ERROR: "Merchant settings not found",
    MERCHANT_SETTINGS_EXCEPTION:
      "Merchant settings cannot be found due to exception",
    MERCHANT_SETTINGS_UPDATE_SUCCESS: "Merchant settings updated successfully.",
    MERCHANT_SETTINGS_TITLE: "Merchant settings",
    MERCHANT_SETTINGS_UPDATE_FAILUE: "Merchant settings can't be updated.",

    USER_PROFILE_TITLE: "User Profile",
    USER_PROFILE_SUCCESS: "Profile fetched successfully",
    USER_PROFILE_FAILURE:
      "Could`t fetch user profile at this moment. Please try again later.",
    USER_PROFILE_UPDATE_SUCCESS: "User profile updated successfully.",
    USER_PROFILE_UPDATE_FAILURE: "User profile can't be updated.",

    // Partner
    PARTNER_TITLE: "Merchant",
    PARTNER_CREATE_SUCCESS: "Merchant created successfully.",
    PARTNER_CREATE_FAILURE: "Merchant could not be created.",
    PARTNER_FETCH_FAILURE: "Merchant could not be  fetched.",
    PARTNER_FETCH_SUCCESS: "Merchant fetched successfully.",
    CRED_EMAIL_SENT_TO_USER:
      "Email with login credentials succesfully sent to user",

    // Communication
    COMMUNICATION_TITLE: "Communication",
    COMMUNICATION_SEND_SUCCESS: "Communication send successfully.",
    COMMUNICATION_SEND_FAILURE: "Communication send failure.",
    COMMUNICATION_CREATE_SUCCESS: "Communication created successfully.",
    COMMUNICATION_CREATE_FAILURE: "Communication could not be created.",
    COMMUNICATION_FETCH_FAILURE: "Communication could not be  fetched.",
    COMMUNICATION_FETCH_SUCCESS: "Communication fetched successfully.",

    // PaymentRequest
    PAYMENT_REQUEST_TITLE: "Payment request",
    LINK_PAYMENT_REQUEST: "Payment request has been linked.",
    PAYMENT_REQUEST_ALREADY_LINKED:
      "Payment request is already linked to account.",
    PAYMENT_REQUEST_CREATE_SUCCESS: "Payment request created successfully.",
    PAYMENT_REQUEST_NOT_FOUND: "Payment request not found.",
    PAYMENT_REQUEST_CONTACT_DETAIL_NOT_MATCHED:
      "Payment request contact details don't match.",
    PAYMENT_REQUEST_CREATE_FAILURE: "Payment request could not be created.",
    PAYMENT_REQUEST_FETCH_FAILURE: "PPayment request could not be  fetched.",
    PAYMENT_REQUEST_FETCH_SUCCESS: "Payment request fetched successfully.",
    PAYMENT_REQUEST_FILE_DELETED_SUCCESS:
      "Payment request file deleted successfully.",
    PAYMENT_REQUEST_FILE_DELETED_FAILURE:
      "Payment request file could not be deleted.",
    PAYMENT_REQUEST_UPDATE_SUCCESS: "Payment request updated successfully.",
    PAYMENT_REQUEST_UPDATE_FAILURE: "Payment request could not be updated.",
    PAYMENT_REQUEST_CANCEL_SUCCESS: "Payment request cancelled successfully.",
    PAYMENT_REQUEST_DOESNT_EXIST: "Payment request does not exist.",
    PAYMENT_REQUEST_NOT_PENDING: "Payment request is not in pending state.",
    PAYMENT_REQUEST_CANCELLED: "Payment request is cancelled.",
    PAYMENT_REQUEST_COMPLETED: "Payment request is completed.",
    PAYMENT_REQUEST_CANNOT_BE_MADE:
      "We cannot make payment for the request. Please contact the admin.",

    // Transaction
    TRANSACTION_TITLE: "Transaction",
    TRANSACTION_CREATE_SUCCESS: "Transaction created successfully.",
    TRANSACTION_CREATE_FAILURE: "Transaction could not be created.",
    TRANSACTION_FETCH_FAILURE: "Transaction could not be  fetched.",
    TRANSACTION_FETCH_SUCCESS: "Transaction fetched successfully.",

    // History
    HISTORY_TITLE: "History",
    HISTORY_CREATE_SUCCESS: "History created successfully.",
    HISTORY_CREATE_FAILURE: "History could not be created.",
    HISTORY_FETCH_FAILURE: "History could not be  fetched.",
    HISTORY_FETCH_SUCCESS: "History fetched successfully.",

    // Custom Field
    CUSTOM_FIELD_TITLE: "Custom field",
    CUSTOM_FIELD_CREATE_SUCCESS: "Custom field created successfully.",
    CUSTOM_FIELD_CREATE_FAILURE: "Custom field could not be created.",
    CUSTOM_FIELD_FETCH_FAILURE: "PCustom field could not be  fetched.",
    CUSTOM_FIELD_FETCH_SUCCESS: "Custom field fetched successfully.",

    //Admin user crud

    ADMIN_USER: "User",
    ADD_ADMIN_USER_SUCCESS_MESSAGE: "Admin user added successfully",
    ADD_ADMIN_USER__FAILURE_MESSAGE: "Error adding admin user",
    ADMIN_USER_FAILURE_MESSAGE: "Unauthorized",
    UPDATE_ADMIN_USER_SUCCESS_MESSAGE: "Admin user updated successfully",
    RESET_PASSWORD_SEND_SUCCESS:
      "Email with new password sent to user successfully",
    ADMIN_USER_DELETE_SUCCESS_MESSAGE: "Admin user deleted successfully",
    ADMIN_USER_DETAIL_SUCCESS_MESSAGE: "Admin user detail listed successfully",
    ADMIN_USER_LIST_SUCCESS_MESSAGE: "Admin user listed successfully",
    ADMIN_PROFILE_UPDATE_SUCCESS: "Profile updated successfully.",
    ADMIN_PROFILE_UPDATE_FAILURE: "Profile can't be updated.",
    //CMS NOTIFICATIONS
    NOTIFICATIONS_LISTED_SUCCESS_MESSAGE: "Notifications listed successfully",
    NOTIFICATIONS_LISTED_FAILURE_MESSAGE: "Error retrieving Notifications",
    NOTIFICATIONS_READ_SUCCESS_MESSAGE: "Notification read successfully",
    NOTIFICATIONS_READ_FAILURE_MESSAGE: "Notification read error",

    //EMAIL VERIFICATION
    EMAIL_VERIFICATION_TITLE: "Email Verifification.",
    EMAIL_VERIFICATION_SUCCESS: "Email verified successfully.",

    //RESEND EMAIL
    RESEND_EMAIL_VERIFICATION_TITLE: "Resend email verification code.",
    RESEND_EMAIL_VERIFICATION_MESSAGE:
      "Activation link has been sent to your email",

    //MOBILE VERIFICATION
    MOBILE_VERIFICATION_TITLE: "Mobile verification.",
    MOBILE_VERIFICATION_SUCCESSS: "Mobile verification code sent successfully.",
    MOBILE_ALREADY_VERIFIED: "Phone number already verified.",
    INVALID_PHONE_CODE: "Invalid or expired phone verification code.",
    PHONE_VERIFIED_SUCCESS: "Phone code verified successfully.",
    PHONE_CODE_ALREADY_SENT:
      "You can`t resend verification code now. Please wait for atleast 2 minutes.",
    CHANGE_PHONE_NUMBER: "Change phone number",

    POSTCODE_TITLE: "Postcode",
    PURCHASE_RESTORE_SUCESS_TITLE: "Purchase restore",
    PURCHASE_RESTORE_SUCESS_MESSAGE: "Purchase restore Sucessfully",
    PURCHASE_FROM_IOS_ERROR:
      "Purchase restore failed. Subscription is purchased from Ios. It can be restored from Ios",
    PURCHASE_FROM_ANDROID_ERROR:
      "Purchase restore failed. Subscription is purchased from Ios. It can be restored from Ios",
    INVALID_TOKEN: "Invalid purchase token",
    PURCHASE_RESTORE_FAIL: "Purchase restore failed.",
    // Email temp;ates
    EMAIL_TEMPLATE: "Email Template",
    EMAIL_TEMPLATE_FAILURE_MESSAGE: "Error processing email template.",
    EMAIL_TEMPLATE_LIST_SUCCESS_MESSAGE: "Email templates listed successfully.",
    EMAIL_TEMPLATE_DETAIL_SUCCESS_MESSAGE:
      "Email template detail listed successfully.",
    EMAIL_TEMPLATE_UPDATE_SUCCESS_MESSAGE:
      "Email template updated successfully.",

    POSTALCODE_TITLE: "Postal code",
    POSTALCODE_CREATE_SUCCESS: "Postal code created successfully.",
    POSTALCODE_UPDATE_SUCCESS: "Postal code updated successfully.",
    POSTALCODE_CREATE_FAILURE: "Postal code can't be created.",
    POSTALCODE_IMPORT_SUCCESS: "Postal code imported successfully.",
    POSTALCODE_DELETE_SUCCESS: "Postal code deleted successfully.",
    POSTALCODE_NOT_FOUND: "Postal code is not found.",

    //FAQS
    FAQ: "FAQs",
    FAQ_IMAGE_SUCCESS: "Successfully saved image for FAQ",
    FAQ_CREATE_SUCCESS: "Successfully created New  FAQs",
    FAQ_CREATE_FAILURE: "Failed to create FAQs",
    SUB_TOPIC_CREATE_SUCCESS: "Successfully created New  Sub Topics",
    SUB_TOPIC_CREATE_FAILURE: "Failed to create Sub Topics",
    QAS_CREATE_SUCCESS: "Successfully created New QAs",
    QAS_CREATE_FAILURE: "Failed to create QAs",
    GET_FAQ_SUCCESS: "Successfully got FAQs",
    GET_FAQ_FAILURE: "Failed to get FAQs ",
    GET_FAQ_DETEILS_SUCCESS: "Successfully got FAQs details",
    GET_FAQ_DETEILS_FAILURE: "Failed to get FAQs details ",
    UPDATE_FAQ_DETEILS_SUCCESS: "Successfully updated FAQs details",
    UPDATE_FAQ_DETEILS_FAILURE: "Failed to update FAQs details ",
    DELETE_FAQ_DETEILS_SUCCESS: "Successfully deleted FAQs details",
    DELETE_FAQ_DETEILS_FAILURE: "Failed to delete FAQs details ",
    SET_FAQ_QA_SUCCESS: "Successfully set FAQs QAs",
    SET_FAQ_QA_FAILURE: "Failed to set FAQs QAs ",
    UNSET_FAQ_QA_SUCCESS: "Successfully UnSet FAQs QAs",
    UNSET_FAQ_QA_FAILURE: "Failed to UnSet FAQs QAs ",
    FAQ_GET_BY_ID_SUCCESS: "Successfully got FAQs",
    FAQ_GET_BY_ID_FAILURE: "Failed to get FAQs",
    FAQ_UPDATE_SUCCESS: "Successfully updated FAQs",
    FAQ_UPDATE_FAILURE: "Failed to update FAQs",
    FAQ_DELETE_SUCCESS: "Successfully deleted FAQs",
    FAQ_DELETE_FAILURE: "Failed to delete FAQs",
    FAQ_NOT_FOUND: "FAQs not Found",

    //charity partners
    ALL_CHARITIES_PARTNERS_SUCCESS: "SUCCESS ALL CHARITIES.",
    ALL_CHARITIES_PARTNERS_SUCCESS_MESSAGE:
      "Successfully got all charities partners.",
    CHARITIES_PARTNERS_DETAILS_SUCCESS: "Charity Partner Details Success.",
    CHARITIES_PARTNERS_DETAILS_SUCCESS_MESSAGE:
      "Successfully got a charity partner details.",
    CHARITIES_PARTNERS_FETCH_ERROR:
      "Error occured while fetching partner details.",
    NO_CHARITY_PARTNER_EXISTS: "No such partner exists",

    //GetHelp
    CREATE_GET_HELP: "Create Gethelp Query.",
    CREATE_GET_HELP_SUCCESS: "Gethelp query created successfully.",
    CREATE_GET_HELP_FAILURE: "Gethelp query can't be created.",
    FETCH_GET_HELP: "Fetch Gethelp Query.",
    FETCH_GET_HELP_SUCCESS: "Sucessfully got all Gethelp Queries.",
    FETCH_GET_HELP_FAILURE: "Failed to get all Gethelp Queries.",
    GET_HELP_MAX_QUERY_LENGTH: 500,

    //Charity Partner
    CHARITY_PARTNER: "Charity Merchant",
    CHARITY_PARTNER_CREATE_SUCCESS: "Charity merchant created successfully",
    CHARITY_PARTNER_EXISTS: "Charity merchant email already exists.",
    CHARITY_PARTNER_NOT_FOUND: "Charity merchant not found.",
    CHARITY_PARTNER_UPDATE_SUCCESS: "Charity merchant updated successfully.",
    // PAYMENTS
    BT_GENERATE_AUTH: "BrainTree Authorization Token",
    BT_GENERATE_AUTH_SUCCESS: "BrainTree Authorization Token generated.",
    BT_GENERATE_AUTH_FAILURE:
      "BrainTree Authorization Token generation failed.",

    ADD_PAYMENT_METHOD: "Add Payment Method",
    ADD_PAYMENT_METHOD_SUCCESS: "Payment Method added successfully.",
    PAYMENT_REQUEST_EXPIRED:
      "Sorry, this payment request has been expired. Contact the person who sent you the link for more information",

    LIST_PAYMENT_METHODS: "List Payment Methods",
    LIST_PAYMENT_METHODS_SUCCESS: "List Payment Methods successfully.",
    LIST_PAYMENT_METHODS_FAILURE: "Failed to get Payment Methods.",

    UPDATE_PAYMENT_METHOD: "Update Payment Method",
    UPDATE_PAYMENT_METHOD_SUCCESS: "Payment Method updated successfully.",
    UPDATE_PAYMENT_METHOD_FAILURE: "Failed to update Payment Method.",

    PAYMENT_METHOD_DEFAULT: "Payment Method Default",
    PAYMENT_METHOD_DEFAULT_SUCCESS: "Payment Method made default successfully.",
    PAYMENT_METHOD_DEFAULT_FAILURE: "Failed to make Payment Method default.",

    DELETE_PAYMENT_METHOD: "Delete Payment Method",
    DELETE_PAYMENT_METHOD_DEFAULT_DELETE:
      "Cannot delete default payment method.",
    DELETE_PAYMENT_METHOD_SUCCESS: "Payment Method deleted successfully.",
    DELETE_PAYMENT_METHOD_FAILURE: "Failed to delete Payment Method.",

    //Fundraiser
    FUNDRAISER_CREATE_SUCCESS: "Fundraiser created successfully.",

    //Fundraiser Listings
    FUNDRAISER: "Fundraiser",
    FETCH_FUNDRAISER: "Fundraiser Listings",
    FUNDRAISER_NOT_FOUND: "Fundraiser not found.",
    FUNDRAISER_UPDATE_SUCCESS: "Fundraiser updated successfully.",
    FETCH_ALL_FUNDRAISER_SUCCESS: "Got all fundraiser listings successfully",
    FETCH_ALL_FUNDRAISER_FAILURE: "Fundraiser listings not found.",
    FETCH_FUNDRAISER_SUCCESS: "Fundraiser listing details got successfully",
    FETCH_FUNDRAISER_FAILURE: "Fundraiser listing details not found.",

    //Donation listings
    DONATION: "Donation",
    DONATION_SUCCES: "Donation success",
    DONATION_FAILURE: "Donation failure",

    // Customer Auth
    CUSTOMER_TITLE: "Customer",
    CUSTOMER_NOT_FOUND: "Customer not found",
    CUSTOMER_NOT_VERIFIED: "Customer not verified",
    OTP_CODE: "OTP Code",
    OTP_FAIL: "Failed to send OTP",
    CUSTOMER_VERIFICATION: "Customer Verification",
    CUSTOMER_VERIFICATION_FAILED: "Customer verification failed.",
    OTP_CODE_WRONG: "Wrong OTP Code",
    CUSTOMER_PROFILE_UPDATE: "Customer profile updated.",

    // Email templates
    EMAIL_TEMPLATES_TITLE: "Email template",
    EMAIL_TEMPLATES_CREATE_SUCCESS: "Email template created successfully.",
    EMAIL_TEMPLATES_CREATE_FAILURE: "Email template could not be created.",
    EMAIL_TEMPLATES_FETCH_FAILURE: "Email template could not be  fetched.",
    EMAIL_TEMPLATES_FETCH_SUCCESS: "Email template fetched successfully.",
    EMAIL_TEMPLATE_MADE_ACTIVE: "Email template made active successfully.",

    // Email templates
    SMS_TEMPLATES_TITLE: "Sms template",
    SMS_TEMPLATES_CREATE_SUCCESS: "Sms template created successfully.",
    SMS_TEMPLATES_CREATE_FAILURE: "Sms template could not be created.",
    SMS_TEMPLATES_FETCH_FAILURE: "Sms template could not be  fetched.",
    SMS_TEMPLATES_FETCH_SUCCESS: "Sms template fetched successfully.",
    SMS_TEMPLATE_MADE_ACTIVE: "Sms template made active successfully.",

    // API USERS
    API_USERS_TITLE: "API USERS",
    API_USERS_TOKEN_SUCCESS: "Api user token fetched successfully",
    API_USERS_TOKEN_FAIL: "Api user token fetch failed.",

    // PAY LATER QUOTES
    PAGE_ID_NOT_FOUND: "PageId not found",
    PLAN_ID_NOT_FOUND: "PlanId not found",

    //TRANSACTIONS
    TRANSACTIONS: "Transaction",
    TRANSACTION_NOT_FOUND: "Transaction not found.",
    NO_COMMS: "No phone/email is recorded against the Payment Request",

    // Logos
    LOGO: "Logo",
    INVALID_MERCHANT_ID: "Invalid merchant id",
    MERCHANT_ID_DOES_NOT_MATCH: "Merchant id does not match with api key",

    // Font Settings
    FONT_SETTINGS_SUCCESS: "Font settings found",
    FONT_SETTINGS_ERROR: "Font settings not found",

    // Brand Settings
    BRAND_SETTINGS_SUCCESS: "Brand settings found",
    BRAND_SETTINGS_ERROR: "Brand settings not found",

    // RequestTemplate
    REQUEST_TEMPLATE_TITLE: "Request template",
    REQUEST_TEMPLATE_CREATE_SUCCESS: "Request template created successfully.",
    REQUEST_TEMPLATE_NOT_FOUND: "Request template not found.",
    REQUEST_TEMPLATE_CREATE_FAILURE: "Request template could not be created.",
    REQUEST_TEMPLATE_FETCH_FAILURE: "Request template could not be fetched.",
    REQUEST_TEMPLATE_FETCH_SUCCESS: "Request template fetched successfully.",
    REQUEST_TEMPLATE_UPDATE_SUCCESS: "Request template updated successfully.",
    REQUEST_TEMPLATE_UPDATE_FAILURE: "Request template could not be updated.",
    REQUEST_TEMPLATE_CANCEL_SUCCESS: "Request template cancelled successfully.",
    REQUEST_TEMPLATE_DOESNT_EXIST: "Request template does not exist.",
    MERCHANT_MISMATCH: "Merchant id does not match with template merchant",

    // Merchant Group
    MERCHANT_GROUP_TITLE: "Merchant group",
    MERCHANT_GROUP_CREATE_SUCCESS: "Merchant group created successfully",

    // thirdparty token reset
    TOKEN_RESET_SUCCESS: "Token reset successfully.",
    TOKEN_ACCESS_DENIED: "Only admin can reset the token.",
    TOKEN_RESET_FAIL: "Unable to reset token",

    // export
    FILE_TITLE: "File",
    FILE_EXPORT_SUCCESS: "File export successfully.",

    // History
    HISTORY: "Notification History",
    HISTORY_DISMIS_FAIL: "Unable to dismis notification",
    HISTORY_DISMIS_SUCCESS: "Notification dismis success",


    USER_TITLE: "User",

    // onboard
    ONBOARD_TITLE: "Onboarding",
    ONBOARD_SUCCESS: "Success",
    ONBOARD_FAILURE: "Failure",

    //Link Request
    LINK_REQUEST_SUCCESS: "Account link success",
    LINK_REQUEST_FAILURE: "Account link failure",
    LINK_REQUEST_UPDATE_SUCCESS: "Link update success",
    LINK_REQUEST_UPDATE_FAILURE: "Link update failure",

    //Link Request
    USERS: "Users",
    USER_EXISTS: "Users with phone number already exists",
    USER_FETCH_SUCCESS: "User fetched successfully.",
    USER_FETCH_FAILURE: "User fetched failure.",

    // Banks
    BANK: "Bank",
    BANK_FETCH_SUCCESS: "Bank fetched successfully.",
    BANK_FETCH_FAILURE: "Bank fetched failure.",
    BANK_SAVE_SUCCESS: "Bank saved successfully",

    // Product Cards
    PRODUCTCARDS: "Flip cards",
    PRODUCTCARDS_FETCH_SUCCESS: "Flip cards fetched successfully.",
    PRODUCTCARDS_FETCH_FAILURE: "Flip cards fetched failure.",
  },
};

const lang = process.env.SYSTEM_LANGUAGE || "EN";

let Lang;

if (lang == "EN") {
  Lang = responseMessages.EN;
}

export default Lang;
