# django-allauth
## Summary
Allauth has provision for exposing functionality via a set of API endpoints, [that is documented here](https://docs.allauth.org/en/latest/headless/index.html).

## Usage for SPA/Mobile clients
By making use of the HEADLESS_ONLY, the following views are suppressed

```
/accounts/3rdparty/   allauth.socialaccount.views.ConnectionsView     socialaccount_connections
/accounts/3rdparty/login/cancelled/   allauth.socialaccount.views.LoginCancelledView  socialaccount_login_cancelled
/accounts/3rdparty/login/error/       allauth.socialaccount.views.LoginErrorView      socialaccount_login_error
/accounts/3rdparty/signup/    allauth.socialaccount.views.SignupView  socialaccount_signup
/accounts/confirm-email/      allauth.account.views.email_verification_sent   account_email_verification_sent
/accounts/confirm-email/<key>/        allauth.account.views.ConfirmEmailView  account_confirm_email
/accounts/email/      allauth.account.views.EmailView account_email
/accounts/inactive/   allauth.account.views.AccountInactiveView       account_inactive
/accounts/login/      allauth.account.views.LoginView account_login
/accounts/login/code/confirm/ allauth.account.views.ConfirmLoginCodeView      account_confirm_login_code
/accounts/logout/     allauth.account.views.LogoutView        account_logout
/accounts/password/change/    allauth.account.views.PasswordChangeView        account_change_password
/accounts/password/reset/     allauth.account.views.PasswordResetView account_reset_password
/accounts/password/reset/done/        allauth.account.views.PasswordResetDoneView     account_reset_password_done
/accounts/password/reset/key/<uidb36>-<key>/  allauth.account.views.PasswordResetFromKeyView  account_reset_password_from_key
/accounts/password/reset/key/done/    allauth.account.views.PasswordResetFromKeyDoneView      account_reset_password_from_key_done
/accounts/password/set/       allauth.account.views.PasswordSetView   account_set_password
/accounts/reauthenticate/     allauth.account.views.ReauthenticateView        account_reauthenticate
/accounts/signup/     allauth.account.views.SignupView        account_signup
/accounts/social/connections/ django.views.generic.base.RedirectView
/accounts/social/login/cancelled/     django.views.generic.base.RedirectView
/accounts/social/login/error/ django.views.generic.base.RedirectView
/accounts/social/signup/      django.views.generic.base.RedirectView
```

While the following end points are left in place

```
/accounts/oidc/<provider_id>/login/     allauth.socialaccount   /accounts/oidc/<provider_id>/login/     allauth.socialaccount
/accounts/oidc/<provider_id>/login/callback/    allauth.socia   /accounts/oidc/<provider_id>/login/callback/    allauth.socia
/accounts/profile/      backend.urls.<lambda>                   /accounts/profile/      backend.urls.<lambda>
```



## OpenAPI Specification
The YAML file in this directory documents the endpoints exposed by allauth. The file, openapi.yaml, was downloaded from https://allauth.org/docs/draft-api/ on 2024-12-04.

It may be viewed by visiting https://editor.swagger.io/ (File > Import File) or by executing the following

```
docker compose up
```

After which the Swagger output will be visible at http://localhost:5000 .

