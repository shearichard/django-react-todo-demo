# django-allauth
## Summary
Allauth has provision for exposing functionality via a set of API endpoints, [that is documented here](https://docs.allauth.org/en/latest/headless/index.html).

## Usage for SPA/Mobile clients
By setting **HEADLESS_ONLY** to _True_ only the following end points are left in place

| Path | View | Name |
| --- | --- | --- |
| _/accounts/oidc/<provider_id>/login/_ |	allauth.socialaccount.providers.openid_connect.views.login	| openid_connect_login |
| _/accounts/oidc/<provider_id>/login/callback/_	| allauth.socialaccount.providers.openid_connect.views.callback	| openid_connect_callback |
| _/accounts/profile/_	| backend.urls.<lambda>_ ||

while the following views are suppressed.

| Path | View | Name |
| --- | --- | --- |
| _/accounts/3rdparty/_ |  allauth.socialaccount.views.ConnectionsView     ||
| _/accounts/3rdparty/login/cancelled/_ |  allauth.socialaccount.views.LoginCancelledView  ||
| _/accounts/3rdparty/login/error/_ |      allauth.socialaccount.views.LoginErrorView      ||
| _/accounts/3rdparty/signup/_ |   allauth.socialaccount.views.SignupView  || 
| _/accounts/confirm-email/_ |      allauth.account.views.email_verification_sent |  account_email_verification_sent |
| _/accounts/confirm-email/<key>_/ |        allauth.account.views.ConfirmEmailView |  account_confirm_email |
| _/accounts/email/_ |      allauth.account.views.EmailView | account_email |
| _/accounts/inactive/_ |   allauth.account.views.AccountInactiveView |       account_inactive |
| _/accounts/login/_ |      allauth.account.views.LoginView | account_login |
| _/accounts/login/code/confirm/_ | allauth.account.views.ConfirmLoginCodeView |     account_confirm_login_code |
| _/accounts/logout/_ |     allauth.account.views.LogoutView      |  account_logout |
| _/accounts/password/change/_ |    allauth.account.views.PasswordChangeView    |    account_change_password |
| _/accounts/password/reset/_ |     allauth.account.views.PasswordResetView | account_reset_password |
| _/accounts/password/reset/done/_ |        allauth.account.views.PasswordResetDoneView  |   account_reset_password_done |
| _/accounts/password/reset/key/<uidb36>-<key>_/ |  allauth.account.views.PasswordResetFromKeyView |  account_reset_password_from_key |
| _/accounts/password/reset/key/done/_ |    allauth.account.views.PasswordResetFromKeyDoneView     |  account_reset_password_from_key_done |
| _/accounts/password/set/_ |       allauth.account.views.PasswordSetView   | account_set_password |
| _/accounts/reauthenticate/_ |     allauth.account.views.ReauthenticateView  |       account_reauthenticate |
| _/accounts/signup/_ |     allauth.account.views.SignupView        | account_signup |
| _/accounts/social/connections/_ | django.views.generic.base.RedirectView ||
| _/accounts/social/login/cancelled/_ |     django.views.generic.base.RedirectView ||
| _/accounts/social/login/error/_ | django.views.generic.base.RedirectView || 
| _/accounts/social/signup/_ |      django.views.generic.base.RedirectView ||


## OpenAPI Specification
The YAML file in this directory documents the endpoints exposed by allauth. The file, openapi.yaml, was downloaded from https://allauth.org/docs/draft-api/ on 2024-12-04.

It may be viewed by visiting https://editor.swagger.io/ (File > Import File) or by executing the following

```
docker compose up
```

After which the Swagger output will be visible at http://localhost:5000 .

## Representative interactions 

### Session

To do anything other than generate a 401 the following request would require authentication.
```
http 'http://127.0.0.1:8000/_allauth/app/v1/auth/session'

```

### Config

```
$ http 'http://localhost:8000/_allauth/app/v1/config'
HTTP/1.1 200 OK
Access-Control-Expose-Headers: Correlation-ID
Cache-Control: max-age=0, no-cache, no-store, must-revalidate, private
Content-Length: 216
Content-Type: application/json
Correlation-ID: 3e53c3cb224044f183db2bd4c7d79779
Cross-Origin-Opener-Policy: same-origin
Date: Wed, 15 Jan 2025 22:01:20 GMT
Expires: Wed, 15 Jan 2025 22:01:20 GMT
Referrer-Policy: same-origin
Server: WSGIServer/0.2 CPython/3.10.12
Vary: origin
X-Content-Type-Options: nosniff
X-Frame-Options: DENY

{
    "data": {
        "account": {
            "authentication_method": "username",
            "email_verification_by_code_enabled": false,
            "is_open_for_signup": true,
            "login_by_code_enabled": false
        },
        "socialaccount": {
            "providers": []
        }
    },
    "status": 200
}
```

