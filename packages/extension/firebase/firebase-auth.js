!(function (e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? t(require('@firebase/app-compat'), require('@firebase/app'))
    : 'function' == typeof define && define.amd
    ? define(['@firebase/app-compat', '@firebase/app'], t)
    : t(
        (e = 'undefined' != typeof globalThis ? globalThis : e || self)
          .firebase,
        e.firebase.INTERNAL.modularAPIs,
      );
})(this, function (oi, ci) {
  'use strict';
  try {
    !function () {
      function e(e) {
        return e && 'object' == typeof e && 'default' in e ? e : { default: e };
      }
      var r,
        t,
        i = e(oi);
      const n = {
          byteToCharMap_: null,
          charToByteMap_: null,
          byteToCharMapWebSafe_: null,
          charToByteMapWebSafe_: null,
          ENCODED_VALS_BASE:
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
          get ENCODED_VALS() {
            return this.ENCODED_VALS_BASE + '+/=';
          },
          get ENCODED_VALS_WEBSAFE() {
            return this.ENCODED_VALS_BASE + '-_.';
          },
          HAS_NATIVE_SUPPORT: 'function' == typeof atob,
          encodeByteArray(r, e) {
            if (!Array.isArray(r))
              throw Error('encodeByteArray takes an array as a parameter');
            this.init_();
            var n = e ? this.byteToCharMapWebSafe_ : this.byteToCharMap_;
            const i = [];
            for (let u = 0; u < r.length; u += 3) {
              var s = r[u],
                a = u + 1 < r.length,
                o = a ? r[u + 1] : 0,
                c = u + 2 < r.length,
                l = c ? r[u + 2] : 0;
              let e = ((15 & o) << 2) | (l >> 6),
                t = 63 & l;
              c || ((t = 64), a || (e = 64)),
                i.push(n[s >> 2], n[((3 & s) << 4) | (o >> 4)], n[e], n[t]);
            }
            return i.join('');
          },
          encodeString(e, t) {
            return this.HAS_NATIVE_SUPPORT && !t
              ? btoa(e)
              : this.encodeByteArray(
                  (function (t) {
                    const r = [];
                    let n = 0;
                    for (let i = 0; i < t.length; i++) {
                      let e = t.charCodeAt(i);
                      e < 128
                        ? (r[n++] = e)
                        : (e < 2048
                            ? (r[n++] = (e >> 6) | 192)
                            : (55296 == (64512 & e) &&
                              i + 1 < t.length &&
                              56320 == (64512 & t.charCodeAt(i + 1))
                                ? ((e =
                                    65536 +
                                    ((1023 & e) << 10) +
                                    (1023 & t.charCodeAt(++i))),
                                  (r[n++] = (e >> 18) | 240),
                                  (r[n++] = ((e >> 12) & 63) | 128))
                                : (r[n++] = (e >> 12) | 224),
                              (r[n++] = ((e >> 6) & 63) | 128)),
                          (r[n++] = (63 & e) | 128));
                    }
                    return r;
                  })(e),
                  t,
                );
          },
          decodeString(e, t) {
            return this.HAS_NATIVE_SUPPORT && !t
              ? atob(e)
              : (function (e) {
                  const t = [];
                  let r = 0,
                    n = 0;
                  for (; r < e.length; ) {
                    var i,
                      s,
                      a = e[r++];
                    a < 128
                      ? (t[n++] = String.fromCharCode(a))
                      : 191 < a && a < 224
                      ? ((i = e[r++]),
                        (t[n++] = String.fromCharCode(
                          ((31 & a) << 6) | (63 & i),
                        )))
                      : 239 < a && a < 365
                      ? ((s =
                          (((7 & a) << 18) |
                            ((63 & e[r++]) << 12) |
                            ((63 & e[r++]) << 6) |
                            (63 & e[r++])) -
                          65536),
                        (t[n++] = String.fromCharCode(55296 + (s >> 10))),
                        (t[n++] = String.fromCharCode(56320 + (1023 & s))))
                      : ((i = e[r++]),
                        (s = e[r++]),
                        (t[n++] = String.fromCharCode(
                          ((15 & a) << 12) | ((63 & i) << 6) | (63 & s),
                        )));
                  }
                  return t.join('');
                })(this.decodeStringToByteArray(e, t));
          },
          decodeStringToByteArray(e, t) {
            this.init_();
            var r = t ? this.charToByteMapWebSafe_ : this.charToByteMap_;
            const n = [];
            for (let c = 0; c < e.length; ) {
              var i = r[e.charAt(c++)],
                s = c < e.length ? r[e.charAt(c)] : 0;
              ++c;
              var a = c < e.length ? r[e.charAt(c)] : 64;
              ++c;
              var o = c < e.length ? r[e.charAt(c)] : 64;
              if ((++c, null == i || null == s || null == a || null == o))
                throw Error();
              n.push((i << 2) | (s >> 4)),
                64 !== a &&
                  (n.push(((s << 4) & 240) | (a >> 2)),
                  64 !== o && n.push(((a << 6) & 192) | o));
            }
            return n;
          },
          init_() {
            if (!this.byteToCharMap_) {
              (this.byteToCharMap_ = {}),
                (this.charToByteMap_ = {}),
                (this.byteToCharMapWebSafe_ = {}),
                (this.charToByteMapWebSafe_ = {});
              for (let e = 0; e < this.ENCODED_VALS.length; e++)
                (this.byteToCharMap_[e] = this.ENCODED_VALS.charAt(e)),
                  (this.charToByteMap_[this.byteToCharMap_[e]] = e),
                  (this.byteToCharMapWebSafe_[e] =
                    this.ENCODED_VALS_WEBSAFE.charAt(e)),
                  (this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]] =
                    e),
                  e >= this.ENCODED_VALS_BASE.length &&
                    ((this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)] =
                      e),
                    (this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)] =
                      e));
            }
          },
        },
        s = function (e) {
          try {
            return n.decodeString(e, !0);
          } catch (e) {
            console.error('base64Decode failed: ', e);
          }
          return null;
        };
      function d() {
        return 'undefined' != typeof navigator &&
          'string' == typeof navigator.userAgent
          ? navigator.userAgent
          : '';
      }
      function a() {
        try {
          return (
            '[object process]' ===
            Object.prototype.toString.call(global.process)
          );
        } catch (e) {
          return !1;
        }
      }
      function o() {
        var e =
          'object' == typeof chrome
            ? chrome.runtime
            : 'object' == typeof browser
            ? browser.runtime
            : void 0;
        return 'object' == typeof e && void 0 !== e.id;
      }
      function c() {
        return (
          'object' == typeof navigator && 'ReactNative' === navigator.product
        );
      }
      function l() {
        const e = d();
        return 0 <= e.indexOf('MSIE ') || 0 <= e.indexOf('Trident/');
      }
      function u() {
        return 'object' == typeof indexedDB;
      }
      class h extends Error {
        constructor(e, t, r) {
          super(t),
            (this.code = e),
            (this.customData = r),
            (this.name = 'FirebaseError'),
            Object.setPrototypeOf(this, h.prototype),
            Error.captureStackTrace &&
              Error.captureStackTrace(this, p.prototype.create);
        }
      }
      class p {
        constructor(e, t, r) {
          (this.service = e), (this.serviceName = t), (this.errors = r);
        }
        create(e, ...t) {
          var n,
            r = t[0] || {},
            i = `${this.service}/${e}`,
            s = this.errors[e],
            s = s
              ? ((n = r),
                s.replace(f, (e, t) => {
                  var r = n[t];
                  return null != r ? String(r) : `<${t}?>`;
                }))
              : 'Error',
            s = `${this.serviceName}: ${s} (${i}).`;
          return new h(i, s, r);
        }
      }
      const f = /\{\$([^}]+)}/g;
      function m(e) {
        const t = [];
        for (const [r, n] of Object.entries(e))
          Array.isArray(n)
            ? n.forEach((e) => {
                t.push(encodeURIComponent(r) + '=' + encodeURIComponent(e));
              })
            : t.push(encodeURIComponent(r) + '=' + encodeURIComponent(n));
        return t.length ? '&' + t.join('&') : '';
      }
      function v(e) {
        const n = {},
          t = e.replace(/^\?/, '').split('&');
        return (
          t.forEach((e) => {
            var t, r;
            e &&
              (([t, r] = e.split('=')),
              (n[decodeURIComponent(t)] = decodeURIComponent(r)));
          }),
          n
        );
      }
      function g(e) {
        var t = e.indexOf('?');
        if (!t) return '';
        var r = e.indexOf('#', t);
        return e.substring(t, 0 < r ? r : void 0);
      }
      class _ {
        constructor(e, t) {
          (this.observers = []),
            (this.unsubscribes = []),
            (this.observerCount = 0),
            (this.task = Promise.resolve()),
            (this.finalized = !1),
            (this.onNoObservers = t),
            this.task
              .then(() => {
                e(this);
              })
              .catch((e) => {
                this.error(e);
              });
        }
        next(t) {
          this.forEachObserver((e) => {
            e.next(t);
          });
        }
        error(t) {
          this.forEachObserver((e) => {
            e.error(t);
          }),
            this.close(t);
        }
        complete() {
          this.forEachObserver((e) => {
            e.complete();
          }),
            this.close();
        }
        subscribe(e, t, r) {
          let n;
          if (void 0 === e && void 0 === t && void 0 === r)
            throw new Error('Missing Observer.');
          (n = (function (e, t) {
            if ('object' != typeof e || null === e) return !1;
            for (const r of t)
              if (r in e && 'function' == typeof e[r]) return !0;
            return !1;
          })(e, ['next', 'error', 'complete'])
            ? e
            : { next: e, error: t, complete: r }),
            void 0 === n.next && (n.next = y),
            void 0 === n.error && (n.error = y),
            void 0 === n.complete && (n.complete = y);
          var i = this.unsubscribeOne.bind(this, this.observers.length);
          return (
            this.finalized &&
              this.task.then(() => {
                try {
                  this.finalError ? n.error(this.finalError) : n.complete();
                } catch (e) {}
              }),
            this.observers.push(n),
            i
          );
        }
        unsubscribeOne(e) {
          void 0 !== this.observers &&
            void 0 !== this.observers[e] &&
            (delete this.observers[e],
            --this.observerCount,
            0 === this.observerCount &&
              void 0 !== this.onNoObservers &&
              this.onNoObservers(this));
        }
        forEachObserver(t) {
          if (!this.finalized)
            for (let e = 0; e < this.observers.length; e++) this.sendOne(e, t);
        }
        sendOne(e, t) {
          this.task.then(() => {
            if (void 0 !== this.observers && void 0 !== this.observers[e])
              try {
                t(this.observers[e]);
              } catch (e) {
                'undefined' != typeof console &&
                  console.error &&
                  console.error(e);
              }
          });
        }
        close(e) {
          this.finalized ||
            ((this.finalized = !0),
            void 0 !== e && (this.finalError = e),
            this.task.then(() => {
              (this.observers = void 0), (this.onNoObservers = void 0);
            }));
        }
      }
      function y() {}
      function I(e) {
        return e && e._delegate ? e._delegate : e;
      }
      function w(e, t) {
        var r = {};
        for (i in e)
          Object.prototype.hasOwnProperty.call(e, i) &&
            t.indexOf(i) < 0 &&
            (r[i] = e[i]);
        if (null != e && 'function' == typeof Object.getOwnPropertySymbols)
          for (
            var n = 0, i = Object.getOwnPropertySymbols(e);
            n < i.length;
            n++
          )
            t.indexOf(i[n]) < 0 &&
              Object.prototype.propertyIsEnumerable.call(e, i[n]) &&
              (r[i[n]] = e[i[n]]);
        return r;
      }
      ((t = r = r || {})[(t.DEBUG = 0)] = 'DEBUG'),
        (t[(t.VERBOSE = 1)] = 'VERBOSE'),
        (t[(t.INFO = 2)] = 'INFO'),
        (t[(t.WARN = 3)] = 'WARN'),
        (t[(t.ERROR = 4)] = 'ERROR'),
        (t[(t.SILENT = 5)] = 'SILENT');
      const T = {
          debug: r.DEBUG,
          verbose: r.VERBOSE,
          info: r.INFO,
          warn: r.WARN,
          error: r.ERROR,
          silent: r.SILENT,
        },
        b = r.INFO,
        k = {
          [r.DEBUG]: 'log',
          [r.VERBOSE]: 'log',
          [r.INFO]: 'info',
          [r.WARN]: 'warn',
          [r.ERROR]: 'error',
        },
        E = (e, t, ...r) => {
          if (!(t < e.logLevel)) {
            var n = new Date().toISOString(),
              i = k[t];
            if (!i)
              throw new Error(
                `Attempted to log a message with an invalid logType (value: ${t})`,
              );
            console[i](`[${n}]  ${e.name}:`, ...r);
          }
        };
      class R {
        constructor(e, t, r) {
          (this.name = e),
            (this.instanceFactory = t),
            (this.type = r),
            (this.multipleInstances = !1),
            (this.serviceProps = {}),
            (this.instantiationMode = 'LAZY'),
            (this.onInstanceCreated = null);
        }
        setInstantiationMode(e) {
          return (this.instantiationMode = e), this;
        }
        setMultipleInstances(e) {
          return (this.multipleInstances = e), this;
        }
        setServiceProps(e) {
          return (this.serviceProps = e), this;
        }
        setInstanceCreatedCallback(e) {
          return (this.onInstanceCreated = e), this;
        }
      }
      const S = {
          FACEBOOK: 'facebook.com',
          GITHUB: 'github.com',
          GOOGLE: 'google.com',
          PASSWORD: 'password',
          PHONE: 'phone',
          TWITTER: 'twitter.com',
        },
        A = {
          EMAIL_SIGNIN: 'EMAIL_SIGNIN',
          PASSWORD_RESET: 'PASSWORD_RESET',
          RECOVER_EMAIL: 'RECOVER_EMAIL',
          REVERT_SECOND_FACTOR_ADDITION: 'REVERT_SECOND_FACTOR_ADDITION',
          VERIFY_AND_CHANGE_EMAIL: 'VERIFY_AND_CHANGE_EMAIL',
          VERIFY_EMAIL: 'VERIFY_EMAIL',
        };
      function O() {
        return {
          'dependent-sdk-initialized-before-auth':
            'Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.',
        };
      }
      function N() {
        return {
          'admin-restricted-operation':
            'This operation is restricted to administrators only.',
          'argument-error': '',
          'app-not-authorized':
            "This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.",
          'app-not-installed':
            'The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.',
          'captcha-check-failed':
            'The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.',
          'code-expired':
            'The SMS code has expired. Please re-send the verification code to try again.',
          'cordova-not-ready': 'Cordova framework is not ready.',
          'cors-unsupported': 'This browser is not supported.',
          'credential-already-in-use':
            'This credential is already associated with a different user account.',
          'custom-token-mismatch':
            'The custom token corresponds to a different audience.',
          'requires-recent-login':
            'This operation is sensitive and requires recent authentication. Log in again before retrying this request.',
          'dependent-sdk-initialized-before-auth':
            'Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.',
          'dynamic-link-not-activated':
            'Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.',
          'email-change-needs-verification':
            'Multi-factor users must always have a verified email.',
          'email-already-in-use':
            'The email address is already in use by another account.',
          'emulator-config-failed':
            'Auth instance has already been used to make a network call. Auth can no longer be configured to use the emulator. Try calling "connectAuthEmulator()" sooner.',
          'expired-action-code': 'The action code has expired.',
          'cancelled-popup-request':
            'This operation has been cancelled due to another conflicting popup being opened.',
          'internal-error': 'An internal AuthError has occurred.',
          'invalid-app-credential':
            'The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.',
          'invalid-app-id':
            'The mobile app identifier is not registed for the current project.',
          'invalid-user-token':
            "This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.",
          'invalid-auth-event': 'An internal AuthError has occurred.',
          'invalid-verification-code':
            'The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure to use the verification code provided by the user.',
          'invalid-continue-uri':
            'The continue URL provided in the request is invalid.',
          'invalid-cordova-configuration':
            'The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.',
          'invalid-custom-token':
            'The custom token format is incorrect. Please check the documentation.',
          'invalid-dynamic-link-domain':
            'The provided dynamic link domain is not configured or authorized for the current project.',
          'invalid-email': 'The email address is badly formatted.',
          'invalid-emulator-scheme':
            'Emulator URL must start with a valid scheme (http:// or https://).',
          'invalid-api-key':
            'Your API key is invalid, please check you have copied it correctly.',
          'invalid-cert-hash':
            'The SHA-1 certificate hash provided is invalid.',
          'invalid-credential':
            'The supplied auth credential is malformed or has expired.',
          'invalid-message-payload':
            'The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.',
          'invalid-multi-factor-session':
            'The request does not contain a valid proof of first factor successful sign-in.',
          'invalid-oauth-provider':
            'EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.',
          'invalid-oauth-client-id':
            'The OAuth client ID provided is either invalid or does not match the specified API key.',
          'unauthorized-domain':
            'This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.',
          'invalid-action-code':
            'The action code is invalid. This can happen if the code is malformed, expired, or has already been used.',
          'wrong-password':
            'The password is invalid or the user does not have a password.',
          'invalid-persistence-type':
            'The specified persistence type is invalid. It can only be local, session or none.',
          'invalid-phone-number':
            'The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].',
          'invalid-provider-id': 'The specified provider ID is invalid.',
          'invalid-recipient-email':
            'The email corresponding to this action failed to send as the provided recipient email address is invalid.',
          'invalid-sender':
            'The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.',
          'invalid-verification-id':
            'The verification ID used to create the phone auth credential is invalid.',
          'invalid-tenant-id': "The Auth instance's tenant ID is invalid.",
          'login-blocked':
            'Login blocked by user-provided method: {$originalMessage}',
          'missing-android-pkg-name':
            'An Android Package Name must be provided if the Android App is required to be installed.',
          'auth-domain-config-required':
            'Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.',
          'missing-app-credential':
            'The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.',
          'missing-verification-code':
            'The phone auth credential was created with an empty SMS verification code.',
          'missing-continue-uri':
            'A continue URL must be provided in the request.',
          'missing-iframe-start': 'An internal AuthError has occurred.',
          'missing-ios-bundle-id':
            'An iOS Bundle ID must be provided if an App Store ID is provided.',
          'missing-or-invalid-nonce':
            'The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.',
          'missing-multi-factor-info':
            'No second factor identifier is provided.',
          'missing-multi-factor-session':
            'The request is missing proof of first factor successful sign-in.',
          'missing-phone-number':
            'To send verification codes, provide a phone number for the recipient.',
          'missing-verification-id':
            'The phone auth credential was created with an empty verification ID.',
          'app-deleted': 'This instance of FirebaseApp has been deleted.',
          'multi-factor-info-not-found':
            'The user does not have a second factor matching the identifier provided.',
          'multi-factor-auth-required':
            'Proof of ownership of a second factor is required to complete sign-in.',
          'account-exists-with-different-credential':
            'An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.',
          'network-request-failed':
            'A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.',
          'no-auth-event': 'An internal AuthError has occurred.',
          'no-such-provider':
            'User was not linked to an account with the given provider.',
          'null-user':
            'A null user object was provided as the argument for an operation which requires a non-null user object.',
          'operation-not-allowed':
            'The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.',
          'operation-not-supported-in-this-environment':
            'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',
          'popup-blocked':
            'Unable to establish a connection with the popup. It may have been blocked by the browser.',
          'popup-closed-by-user':
            'The popup has been closed by the user before finalizing the operation.',
          'provider-already-linked':
            'User can only be linked to one identity for the given provider.',
          'quota-exceeded':
            "The project's quota for this operation has been exceeded.",
          'redirect-cancelled-by-user':
            'The redirect operation has been cancelled by the user before finalizing.',
          'redirect-operation-pending':
            'A redirect sign-in operation is already pending.',
          'rejected-credential':
            'The request contains malformed or mismatching credentials.',
          'second-factor-already-in-use':
            'The second factor is already enrolled on this account.',
          'maximum-second-factor-count-exceeded':
            'The maximum allowed number of second factors on a user has been exceeded.',
          'tenant-id-mismatch':
            "The provided tenant ID does not match the Auth instance's tenant ID",
          timeout: 'The operation has timed out.',
          'user-token-expired':
            "The user's credential is no longer valid. The user must sign in again.",
          'too-many-requests':
            'We have blocked all requests from this device due to unusual activity. Try again later.',
          'unauthorized-continue-uri':
            'The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.',
          'unsupported-first-factor':
            'Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.',
          'unsupported-persistence-type':
            'The current environment does not support the specified persistence type.',
          'unsupported-tenant-operation':
            'This operation is not supported in a multi-tenant context.',
          'unverified-email': 'The operation requires a verified email.',
          'user-cancelled':
            'The user did not grant your application the permissions it requested.',
          'user-not-found':
            'There is no user record corresponding to this identifier. The user may have been deleted.',
          'user-disabled':
            'The user account has been disabled by an administrator.',
          'user-mismatch':
            'The supplied credentials do not correspond to the previously signed in user.',
          'user-signed-out': '',
          'weak-password': 'The password must be 6 characters long or more.',
          'web-storage-unsupported':
            'This browser is not supported or 3rd party cookies and data may be disabled.',
          'already-initialized':
            'initializeAuth() has already been called with different options. To avoid this error, call initializeAuth() with the same options as when it was originally called, or call getAuth() to return the already initialized instance.',
        };
      }
      const P = O,
        C = new p('auth', 'Firebase', O()),
        L = new (class {
          constructor(e) {
            (this.name = e),
              (this._logLevel = b),
              (this._logHandler = E),
              (this._userLogHandler = null);
          }
          get logLevel() {
            return this._logLevel;
          }
          set logLevel(e) {
            if (!(e in r))
              throw new TypeError(
                `Invalid value "${e}" assigned to \`logLevel\``,
              );
            this._logLevel = e;
          }
          setLogLevel(e) {
            this._logLevel = 'string' == typeof e ? T[e] : e;
          }
          get logHandler() {
            return this._logHandler;
          }
          set logHandler(e) {
            if ('function' != typeof e)
              throw new TypeError(
                'Value assigned to `logHandler` must be a function',
              );
            this._logHandler = e;
          }
          get userLogHandler() {
            return this._userLogHandler;
          }
          set userLogHandler(e) {
            this._userLogHandler = e;
          }
          debug(...e) {
            this._userLogHandler && this._userLogHandler(this, r.DEBUG, ...e),
              this._logHandler(this, r.DEBUG, ...e);
          }
          log(...e) {
            this._userLogHandler && this._userLogHandler(this, r.VERBOSE, ...e),
              this._logHandler(this, r.VERBOSE, ...e);
          }
          info(...e) {
            this._userLogHandler && this._userLogHandler(this, r.INFO, ...e),
              this._logHandler(this, r.INFO, ...e);
          }
          warn(...e) {
            this._userLogHandler && this._userLogHandler(this, r.WARN, ...e),
              this._logHandler(this, r.WARN, ...e);
          }
          error(...e) {
            this._userLogHandler && this._userLogHandler(this, r.ERROR, ...e),
              this._logHandler(this, r.ERROR, ...e);
          }
        })('@firebase/auth');
      function D(e, ...t) {
        L.logLevel <= r.ERROR &&
          L.error(`Auth (${ci.SDK_VERSION}): ${e}`, ...t);
      }
      function M(e, ...t) {
        throw V(e, ...t);
      }
      function U(e, ...t) {
        return V(e, ...t);
      }
      function F(e, t, r) {
        var n = Object.assign(Object.assign({}, P()), { [t]: r });
        const i = new p('auth', 'Firebase', n);
        return i.create(t, { appName: e.name });
      }
      function x(e, t, r) {
        if (!(t instanceof r))
          throw (
            (r.name !== t.constructor.name && M(e, 'argument-error'),
            F(
              e,
              'argument-error',
              `Type of ${t.constructor.name} does not match expected instance.` +
                'Did you pass a reference from a different Auth SDK?',
            ))
          );
      }
      function V(e, ...t) {
        if ('string' == typeof e) return C.create(e, ...t);
        {
          var r = t[0];
          const n = [...t.slice(1)];
          return (
            n[0] && (n[0].appName = e.name), e._errorFactory.create(r, ...n)
          );
        }
      }
      function j(e, t, ...r) {
        if (!e) throw V(t, ...r);
      }
      function W(e) {
        var t = 'INTERNAL ASSERTION FAILED: ' + e;
        throw (D(t), new Error(t));
      }
      function H(e, t) {
        e || W(t);
      }
      const q = new Map();
      function z(e) {
        H(e instanceof Function, 'Expected a class definition');
        let t = q.get(e);
        return (
          t
            ? H(
                t instanceof e,
                'Instance stored in cache mismatched with class',
              )
            : ((t = new e()), q.set(e, t)),
          t
        );
      }
      function B() {
        var e;
        return (
          ('undefined' != typeof self &&
            (null === (e = self.location) || void 0 === e ? void 0 : e.href)) ||
          ''
        );
      }
      function G() {
        return 'http:' === K() || 'https:' === K();
      }
      function K() {
        var e;
        return (
          ('undefined' != typeof self &&
            (null === (e = self.location) || void 0 === e
              ? void 0
              : e.protocol)) ||
          null
        );
      }
      class $ {
        constructor(e, t) {
          H(
            (this.shortDelay = e) < (this.longDelay = t),
            'Short delay should be less than long delay!',
          ),
            (this.isMobile =
              ('undefined' != typeof window &&
                !!(window.cordova || window.phonegap || window.PhoneGap) &&
                /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(
                  d(),
                )) ||
              c());
        }
        get() {
          return 'undefined' != typeof navigator &&
            navigator &&
            'onLine' in navigator &&
            'boolean' == typeof navigator.onLine &&
            (G() || o() || 'connection' in navigator) &&
            !navigator.onLine
            ? Math.min(5e3, this.shortDelay)
            : this.isMobile
            ? this.longDelay
            : this.shortDelay;
        }
      }
      function J(e, t) {
        H(e.emulator, 'Emulator should always be set here');
        var r = e.emulator['url'];
        return t ? `${r}${t.startsWith('/') ? t.slice(1) : t}` : r;
      }
      class Y {
        static initialize(e, t, r) {
          (this.fetchImpl = e),
            t && (this.headersImpl = t),
            r && (this.responseImpl = r);
        }
        static fetch() {
          return (
            this.fetchImpl ||
            ('undefined' != typeof self && 'fetch' in self
              ? self.fetch
              : void W(
                  'Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill',
                ))
          );
        }
        static headers() {
          return (
            this.headersImpl ||
            ('undefined' != typeof self && 'Headers' in self
              ? self.Headers
              : void W(
                  'Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill',
                ))
          );
        }
        static response() {
          return (
            this.responseImpl ||
            ('undefined' != typeof self && 'Response' in self
              ? self.Response
              : void W(
                  'Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill',
                ))
          );
        }
      }
      const X = {
          CREDENTIAL_MISMATCH: 'custom-token-mismatch',
          MISSING_CUSTOM_TOKEN: 'internal-error',
          INVALID_IDENTIFIER: 'invalid-email',
          MISSING_CONTINUE_URI: 'internal-error',
          INVALID_PASSWORD: 'wrong-password',
          MISSING_PASSWORD: 'internal-error',
          EMAIL_EXISTS: 'email-already-in-use',
          PASSWORD_LOGIN_DISABLED: 'operation-not-allowed',
          INVALID_IDP_RESPONSE: 'invalid-credential',
          INVALID_PENDING_TOKEN: 'invalid-credential',
          FEDERATED_USER_ID_ALREADY_LINKED: 'credential-already-in-use',
          MISSING_REQ_TYPE: 'internal-error',
          EMAIL_NOT_FOUND: 'user-not-found',
          RESET_PASSWORD_EXCEED_LIMIT: 'too-many-requests',
          EXPIRED_OOB_CODE: 'expired-action-code',
          INVALID_OOB_CODE: 'invalid-action-code',
          MISSING_OOB_CODE: 'internal-error',
          CREDENTIAL_TOO_OLD_LOGIN_AGAIN: 'requires-recent-login',
          INVALID_ID_TOKEN: 'invalid-user-token',
          TOKEN_EXPIRED: 'user-token-expired',
          USER_NOT_FOUND: 'user-token-expired',
          TOO_MANY_ATTEMPTS_TRY_LATER: 'too-many-requests',
          INVALID_CODE: 'invalid-verification-code',
          INVALID_SESSION_INFO: 'invalid-verification-id',
          INVALID_TEMPORARY_PROOF: 'invalid-credential',
          MISSING_SESSION_INFO: 'missing-verification-id',
          SESSION_EXPIRED: 'code-expired',
          MISSING_ANDROID_PACKAGE_NAME: 'missing-android-pkg-name',
          UNAUTHORIZED_DOMAIN: 'unauthorized-continue-uri',
          INVALID_OAUTH_CLIENT_ID: 'invalid-oauth-client-id',
          ADMIN_ONLY_OPERATION: 'admin-restricted-operation',
          INVALID_MFA_PENDING_CREDENTIAL: 'invalid-multi-factor-session',
          MFA_ENROLLMENT_NOT_FOUND: 'multi-factor-info-not-found',
          MISSING_MFA_ENROLLMENT_ID: 'missing-multi-factor-info',
          MISSING_MFA_PENDING_CREDENTIAL: 'missing-multi-factor-session',
          SECOND_FACTOR_EXISTS: 'second-factor-already-in-use',
          SECOND_FACTOR_LIMIT_EXCEEDED: 'maximum-second-factor-count-exceeded',
          BLOCKING_FUNCTION_ERROR_RESPONSE: 'internal-error',
        },
        Z = new $(3e4, 6e4);
      function Q(e, t) {
        return e.tenantId && !t.tenantId
          ? Object.assign(Object.assign({}, t), { tenantId: e.tenantId })
          : t;
      }
      async function ee(i, s, a, o, e = {}) {
        return te(i, e, async () => {
          let e = {},
            t = {};
          o && ('GET' === s ? (t = o) : (e = { body: JSON.stringify(o) }));
          var r = m(Object.assign({ key: i.config.apiKey }, t)).slice(1);
          const n = await i._getAdditionalHeaders();
          return (
            (n['Content-Type'] = 'application/json'),
            i.languageCode && (n['X-Firebase-Locale'] = i.languageCode),
            Y.fetch()(
              ne(i, i.config.apiHost, a, r),
              Object.assign(
                { method: s, headers: n, referrerPolicy: 'no-referrer' },
                e,
              ),
            )
          );
        });
      }
      async function te(t, e, r) {
        t._canInitEmulator = !1;
        var n = Object.assign(Object.assign({}, X), e);
        try {
          const a = new ie(t),
            o = await Promise.race([r(), a.promise]);
          a.clearNetworkTimeout();
          var i = await o.json();
          if ('needConfirmation' in i)
            throw se(t, 'account-exists-with-different-credential', i);
          if (o.ok && !('errorMessage' in i)) return i;
          {
            const c = o.ok ? i.errorMessage : i.error.message,
              [l, u] = c.split(' : ');
            if ('FEDERATED_USER_ID_ALREADY_LINKED' === l)
              throw se(t, 'credential-already-in-use', i);
            if ('EMAIL_EXISTS' === l) throw se(t, 'email-already-in-use', i);
            if ('USER_DISABLED' === l) throw se(t, 'user-disabled', i);
            var s = n[l] || l.toLowerCase().replace(/[_\s]+/g, '-');
            if (u) throw F(t, s, u);
            M(t, s);
          }
        } catch (e) {
          if (e instanceof h) throw e;
          M(t, 'network-request-failed');
        }
      }
      async function re(e, t, r, n, i = {}) {
        var s = await ee(e, t, r, n, i);
        return (
          'mfaPendingCredential' in s &&
            M(e, 'multi-factor-auth-required', { _serverResponse: s }),
          s
        );
      }
      function ne(e, t, r, n) {
        var i = `${t}${r}?${n}`;
        return e.config.emulator
          ? J(e.config, i)
          : `${e.config.apiScheme}://${i}`;
      }
      class ie {
        constructor(e) {
          (this.auth = e),
            (this.timer = null),
            (this.promise = new Promise((e, t) => {
              this.timer = setTimeout(
                () => t(U(this.auth, 'network-request-failed')),
                Z.get(),
              );
            }));
        }
        clearNetworkTimeout() {
          clearTimeout(this.timer);
        }
      }
      function se(e, t, r) {
        const n = { appName: e.name };
        r.email && (n.email = r.email),
          r.phoneNumber && (n.phoneNumber = r.phoneNumber);
        const i = U(e, t, n);
        return (i.customData._tokenResponse = r), i;
      }
      function ae(e) {
        if (e)
          try {
            const t = new Date(Number(e));
            if (!isNaN(t.getTime())) return t.toUTCString();
          } catch (e) {}
      }
      function oe(e) {
        return 1e3 * Number(e);
      }
      function ce(e) {
        var [t, r, n] = e.split('.');
        if (void 0 === t || void 0 === r || void 0 === n)
          return D('JWT malformed, contained fewer than 3 sections'), null;
        try {
          var i = s(r);
          return i
            ? JSON.parse(i)
            : (D('Failed to decode base64 JWT payload'), null);
        } catch (e) {
          return D('Caught error parsing JWT payload as JSON', e), null;
        }
      }
      async function le(t, r, e = !1) {
        if (e) return r;
        try {
          return r;
        } catch (e) {
          throw (
            (e instanceof h &&
              ((r = [e['code']][0]),
              'auth/user-disabled' === r || 'auth/user-token-expired' === r) &&
              t.auth.currentUser === t &&
              (await t.auth.signOut()),
            e)
          );
        }
      }
      class ue {
        constructor(e) {
          (this.user = e),
            (this.isRunning = !1),
            (this.timerId = null),
            (this.errorBackoff = 3e4);
        }
        _start() {
          this.isRunning || ((this.isRunning = !0), this.schedule());
        }
        _stop() {
          this.isRunning &&
            ((this.isRunning = !1),
            null !== this.timerId && clearTimeout(this.timerId));
        }
        getInterval(e) {
          if (e) {
            var t = this.errorBackoff;
            return (
              (this.errorBackoff = Math.min(2 * this.errorBackoff, 96e4)), t
            );
          }
          this.errorBackoff = 3e4;
          t =
            (null !== (t = this.user.stsTokenManager.expirationTime) &&
            void 0 !== t
              ? t
              : 0) -
            Date.now() -
            3e5;
          return Math.max(0, t);
        }
        schedule(e = !1) {
          var t;
          this.isRunning &&
            ((t = this.getInterval(e)),
            (this.timerId = setTimeout(async () => {
              await this.iteration();
            }, t)));
        }
        async iteration() {
          try {
            await this.user.getIdToken(!0);
          } catch (e) {
            return void (
              'auth/network-request-failed' === e.code && this.schedule(!0)
            );
          }
          this.schedule();
        }
      }
      class de {
        constructor(e, t) {
          (this.createdAt = e), (this.lastLoginAt = t), this._initializeTime();
        }
        _initializeTime() {
          (this.lastSignInTime = ae(this.lastLoginAt)),
            (this.creationTime = ae(this.createdAt));
        }
        _copy(e) {
          (this.createdAt = e.createdAt),
            (this.lastLoginAt = e.lastLoginAt),
            this._initializeTime();
        }
        toJSON() {
          return { createdAt: this.createdAt, lastLoginAt: this.lastLoginAt };
        }
      }
      async function he(e) {
        var t = e.auth,
          r = await e.getIdToken(),
          n = await le(
            e,
            (async function (e, t) {
              return ee(e, 'POST', '/v1/accounts:lookup', t);
            })(t, { idToken: r }),
          );
        j(null == n ? void 0 : n.users.length, t, 'internal-error');
        var i = n.users[0];
        e._notifyReloadListener(i);
        var s,
          a,
          t =
            null !== (r = i.providerUserInfo) && void 0 !== r && r.length
              ? i.providerUserInfo.map((e) => {
                  var t = e['providerId'],
                    r = w(e, ['providerId']);
                  return {
                    providerId: t,
                    uid: r.rawId || '',
                    displayName: r.displayName || null,
                    email: r.email || null,
                    phoneNumber: r.phoneNumber || null,
                    photoURL: r.photoUrl || null,
                  };
                })
              : [],
          n =
            ((s = e.providerData),
            (a = t),
            [
              ...s.filter((t) => !a.some((e) => e.providerId === t.providerId)),
              ...a,
            ]),
          r = e.isAnonymous,
          t = !((e.email && i.passwordHash) || (null !== n && n.length)),
          t = !!r && t,
          t = {
            uid: i.localId,
            displayName: i.displayName || null,
            photoURL: i.photoUrl || null,
            email: i.email || null,
            emailVerified: i.emailVerified || !1,
            phoneNumber: i.phoneNumber || null,
            tenantId: i.tenantId || null,
            providerData: n,
            metadata: new de(i.createdAt, i.lastLoginAt),
            isAnonymous: t,
          };
        Object.assign(e, t);
      }
      class pe {
        constructor() {
          (this.refreshToken = null),
            (this.accessToken = null),
            (this.expirationTime = null);
        }
        get isExpired() {
          return !this.expirationTime || Date.now() > this.expirationTime - 3e4;
        }
        updateFromServerResponse(e) {
          j(e.idToken, 'internal-error'),
            j(void 0 !== e.idToken, 'internal-error'),
            j(void 0 !== e.refreshToken, 'internal-error');
          var t,
            r,
            r =
              'expiresIn' in e && void 0 !== e.expiresIn
                ? Number(e.expiresIn)
                : ((t = e.idToken),
                  j((r = ce(t)), 'internal-error'),
                  j(void 0 !== r.exp, 'internal-error'),
                  j(void 0 !== r.iat, 'internal-error'),
                  Number(r.exp) - Number(r.iat));
          this.updateTokensAndExpiration(e.idToken, e.refreshToken, r);
        }
        async getToken(e, t = !1) {
          return (
            j(!this.accessToken || this.refreshToken, e, 'user-token-expired'),
            t || !this.accessToken || this.isExpired
              ? this.refreshToken
                ? (await this.refresh(e, this.refreshToken), this.accessToken)
                : null
              : this.accessToken
          );
        }
        clearRefreshToken() {
          this.refreshToken = null;
        }
        async refresh(e, t) {
          var i,
            s,
            {
              accessToken: r,
              refreshToken: n,
              expiresIn: a,
            } = ((s = t),
            await {
              accessToken: (a = await te((i = e), {}, async () => {
                var e = m({
                    grant_type: 'refresh_token',
                    refresh_token: s,
                  }).slice(1),
                  { tokenApiHost: t, apiKey: r } = i.config,
                  r = ne(i, t, '/v1/token', `key=${r}`);
                const n = await i._getAdditionalHeaders();
                return (
                  (n['Content-Type'] = 'application/x-www-form-urlencoded'),
                  Y.fetch()(r, { method: 'POST', headers: n, body: e })
                );
              })).access_token,
              expiresIn: a.expires_in,
              refreshToken: a.refresh_token,
            });
          this.updateTokensAndExpiration(r, n, Number(a));
        }
        updateTokensAndExpiration(e, t, r) {
          (this.refreshToken = t || null),
            (this.accessToken = e || null),
            (this.expirationTime = Date.now() + 1e3 * r);
        }
        static fromJSON(e, t) {
          var { refreshToken: r, accessToken: n, expirationTime: i } = t;
          const s = new pe();
          return (
            r &&
              (j('string' == typeof r, 'internal-error', { appName: e }),
              (s.refreshToken = r)),
            n &&
              (j('string' == typeof n, 'internal-error', { appName: e }),
              (s.accessToken = n)),
            i &&
              (j('number' == typeof i, 'internal-error', { appName: e }),
              (s.expirationTime = i)),
            s
          );
        }
        toJSON() {
          return {
            refreshToken: this.refreshToken,
            accessToken: this.accessToken,
            expirationTime: this.expirationTime,
          };
        }
        _assign(e) {
          (this.accessToken = e.accessToken),
            (this.refreshToken = e.refreshToken),
            (this.expirationTime = e.expirationTime);
        }
        _clone() {
          return Object.assign(new pe(), this.toJSON());
        }
        _performRefresh() {
          return W('not implemented');
        }
      }
      function fe(e, t) {
        j('string' == typeof e || void 0 === e, 'internal-error', {
          appName: t,
        });
      }
      class me {
        constructor(e) {
          var { uid: t, auth: r, stsTokenManager: n } = e,
            i = w(e, ['uid', 'auth', 'stsTokenManager']);
          (this.providerId = 'firebase'),
            (this.proactiveRefresh = new ue(this)),
            (this.reloadUserInfo = null),
            (this.reloadListener = null),
            (this.uid = t),
            (this.auth = r),
            (this.stsTokenManager = n),
            (this.accessToken = n.accessToken),
            (this.displayName = i.displayName || null),
            (this.email = i.email || null),
            (this.emailVerified = i.emailVerified || !1),
            (this.phoneNumber = i.phoneNumber || null),
            (this.photoURL = i.photoURL || null),
            (this.isAnonymous = i.isAnonymous || !1),
            (this.tenantId = i.tenantId || null),
            (this.providerData = i.providerData ? [...i.providerData] : []),
            (this.metadata = new de(
              i.createdAt || void 0,
              i.lastLoginAt || void 0,
            ));
        }
        async getIdToken(e) {
          var t = await le(this, this.stsTokenManager.getToken(this.auth, e));
          return (
            j(t, this.auth, 'internal-error'),
            this.accessToken !== t &&
              ((this.accessToken = t),
              await this.auth._persistUserIfCurrent(this),
              this.auth._notifyListenersIfCurrent(this)),
            t
          );
        }
        getIdTokenResult(e) {
          return (async function (e, t = !1) {
            const r = I(e);
            var n = await r.getIdToken(t),
              i = ce(n);
            j(i && i.exp && i.auth_time && i.iat, r.auth, 'internal-error');
            var s = 'object' == typeof i.firebase ? i.firebase : void 0,
              a = null == s ? void 0 : s.sign_in_provider;
            return {
              claims: i,
              token: n,
              authTime: ae(oe(i.auth_time)),
              issuedAtTime: ae(oe(i.iat)),
              expirationTime: ae(oe(i.exp)),
              signInProvider: a || null,
              signInSecondFactor:
                (null == s ? void 0 : s.sign_in_second_factor) || null,
            };
          })(this, e);
        }
        reload() {
          return (async function (e) {
            const t = I(e);
            await he(t),
              await t.auth._persistUserIfCurrent(t),
              t.auth._notifyListenersIfCurrent(t);
          })(this);
        }
        _assign(e) {
          this !== e &&
            (j(this.uid === e.uid, this.auth, 'internal-error'),
            (this.displayName = e.displayName),
            (this.photoURL = e.photoURL),
            (this.email = e.email),
            (this.emailVerified = e.emailVerified),
            (this.phoneNumber = e.phoneNumber),
            (this.isAnonymous = e.isAnonymous),
            (this.tenantId = e.tenantId),
            (this.providerData = e.providerData.map((e) =>
              Object.assign({}, e),
            )),
            this.metadata._copy(e.metadata),
            this.stsTokenManager._assign(e.stsTokenManager));
        }
        _clone(e) {
          return new me(
            Object.assign(Object.assign({}, this), {
              auth: e,
              stsTokenManager: this.stsTokenManager._clone(),
            }),
          );
        }
        _onReload(e) {
          j(!this.reloadListener, this.auth, 'internal-error'),
            (this.reloadListener = e),
            this.reloadUserInfo &&
              (this._notifyReloadListener(this.reloadUserInfo),
              (this.reloadUserInfo = null));
        }
        _notifyReloadListener(e) {
          this.reloadListener
            ? this.reloadListener(e)
            : (this.reloadUserInfo = e);
        }
        _startProactiveRefresh() {
          this.proactiveRefresh._start();
        }
        _stopProactiveRefresh() {
          this.proactiveRefresh._stop();
        }
        async _updateTokensIfNecessary(e, t = !1) {
          let r = !1;
          e.idToken &&
            e.idToken !== this.stsTokenManager.accessToken &&
            (this.stsTokenManager.updateFromServerResponse(e), (r = !0)),
            t && (await he(this)),
            await this.auth._persistUserIfCurrent(this),
            r && this.auth._notifyListenersIfCurrent(this);
        }
        async delete() {
          var e = await this.getIdToken();
          return (
            await le(
              this,
              (async function (e, t) {
                return ee(e, 'POST', '/v1/accounts:delete', t);
              })(this.auth, { idToken: e }),
            ),
            this.stsTokenManager.clearRefreshToken(),
            this.auth.signOut()
          );
        }
        toJSON() {
          return Object.assign(
            Object.assign(
              {
                uid: this.uid,
                email: this.email || void 0,
                emailVerified: this.emailVerified,
                displayName: this.displayName || void 0,
                isAnonymous: this.isAnonymous,
                photoURL: this.photoURL || void 0,
                phoneNumber: this.phoneNumber || void 0,
                tenantId: this.tenantId || void 0,
                providerData: this.providerData.map((e) =>
                  Object.assign({}, e),
                ),
                stsTokenManager: this.stsTokenManager.toJSON(),
                _redirectEventId: this._redirectEventId,
              },
              this.metadata.toJSON(),
            ),
            { apiKey: this.auth.config.apiKey, appName: this.auth.name },
          );
        }
        get refreshToken() {
          return this.stsTokenManager.refreshToken || '';
        }
        static _fromJSON(e, t) {
          var r = null !== (a = t.displayName) && void 0 !== a ? a : void 0,
            n = null !== (m = t.email) && void 0 !== m ? m : void 0,
            i = null !== (o = t.phoneNumber) && void 0 !== o ? o : void 0,
            s = null !== (l = t.photoURL) && void 0 !== l ? l : void 0,
            a = null !== (c = t.tenantId) && void 0 !== c ? c : void 0,
            o = null !== (m = t._redirectEventId) && void 0 !== m ? m : void 0,
            c = null !== (l = t.createdAt) && void 0 !== l ? l : void 0,
            l = null !== (m = t.lastLoginAt) && void 0 !== m ? m : void 0;
          const {
            uid: u,
            emailVerified: d,
            isAnonymous: h,
            providerData: p,
            stsTokenManager: f,
          } = t;
          j(u && f, e, 'internal-error');
          var m = pe.fromJSON(this.name, f);
          j('string' == typeof u, e, 'internal-error'),
            fe(r, e.name),
            fe(n, e.name),
            j('boolean' == typeof d, e, 'internal-error'),
            j('boolean' == typeof h, e, 'internal-error'),
            fe(i, e.name),
            fe(s, e.name),
            fe(a, e.name),
            fe(o, e.name),
            fe(c, e.name),
            fe(l, e.name);
          const v = new me({
            uid: u,
            auth: e,
            email: n,
            emailVerified: d,
            displayName: r,
            isAnonymous: h,
            photoURL: s,
            phoneNumber: i,
            tenantId: a,
            stsTokenManager: m,
            createdAt: c,
            lastLoginAt: l,
          });
          return (
            p &&
              Array.isArray(p) &&
              (v.providerData = p.map((e) => Object.assign({}, e))),
            o && (v._redirectEventId = o),
            v
          );
        }
        static async _fromIdTokenResponse(e, t, r = !1) {
          const n = new pe();
          n.updateFromServerResponse(t);
          var i = new me({
            uid: t.localId,
            auth: e,
            stsTokenManager: n,
            isAnonymous: r,
          });
          return await he(i), i;
        }
      }
      class ve {
        constructor() {
          (this.type = 'NONE'), (this.storage = {});
        }
        async _isAvailable() {
          return !0;
        }
        async _set(e, t) {
          this.storage[e] = t;
        }
        async _get(e) {
          var t = this.storage[e];
          return void 0 === t ? null : t;
        }
        async _remove(e) {
          delete this.storage[e];
        }
        _addListener(e, t) {}
        _removeListener(e, t) {}
      }
      ve.type = 'NONE';
      const ge = ve;
      function _e(e, t, r) {
        return `firebase:${e}:${t}:${r}`;
      }
      class ye {
        constructor(e, t, r) {
          (this.persistence = e), (this.auth = t), (this.userKey = r);
          var { config: n, name: i } = this.auth;
          (this.fullUserKey = _e(this.userKey, n.apiKey, i)),
            (this.fullPersistenceKey = _e('persistence', n.apiKey, i)),
            (this.boundEventHandler = t._onStorageEvent.bind(t)),
            this.persistence._addListener(
              this.fullUserKey,
              this.boundEventHandler,
            );
        }
        setCurrentUser(e) {
          return this.persistence._set(this.fullUserKey, e.toJSON());
        }
        async getCurrentUser() {
          var e = await this.persistence._get(this.fullUserKey);
          return e ? me._fromJSON(this.auth, e) : null;
        }
        removeCurrentUser() {
          return this.persistence._remove(this.fullUserKey);
        }
        savePersistenceForRedirect() {
          return this.persistence._set(
            this.fullPersistenceKey,
            this.persistence.type,
          );
        }
        async setPersistence(e) {
          if (this.persistence !== e) {
            var t = await this.getCurrentUser();
            return (
              await this.removeCurrentUser(),
              (this.persistence = e),
              t ? this.setCurrentUser(t) : void 0
            );
          }
        }
        delete() {
          this.persistence._removeListener(
            this.fullUserKey,
            this.boundEventHandler,
          );
        }
        static async create(e, t, r = 'authUser') {
          if (!t.length) return new ye(z(ge), e, r);
          const n = (
            await Promise.all(
              t.map(async (e) => {
                if (await e._isAvailable()) return e;
              }),
            )
          ).filter((e) => e);
          let i = n[0] || z(ge);
          const s = _e(r, e.config.apiKey, e.name);
          let a = null;
          for (const u of t)
            try {
              var o = await u._get(s);
              if (o) {
                var c = me._fromJSON(e, o);
                u !== i && (a = c), (i = u);
                break;
              }
            } catch (e) {}
          var l = n.filter((e) => e._shouldAllowMigration);
          return (
            i._shouldAllowMigration &&
              l.length &&
              ((i = l[0]),
              a && (await i._set(s, a.toJSON())),
              await Promise.all(
                t.map(async (e) => {
                  if (e !== i)
                    try {
                      await e._remove(s);
                    } catch (e) {}
                }),
              )),
            new ye(i, e, r)
          );
        }
      }
      function Ie(e) {
        const t = e.toLowerCase();
        if (t.includes('opera/') || t.includes('opr/') || t.includes('opios/'))
          return 'Opera';
        if (ke(t)) return 'IEMobile';
        if (t.includes('msie') || t.includes('trident/')) return 'IE';
        if (t.includes('edge/')) return 'Edge';
        if (we(t)) return 'Firefox';
        if (t.includes('silk/')) return 'Silk';
        if (Re(t)) return 'Blackberry';
        if (Se(t)) return 'Webos';
        if (Te(t)) return 'Safari';
        if ((t.includes('chrome/') || be(t)) && !t.includes('edge/'))
          return 'Chrome';
        if (Ee(t)) return 'Android';
        var r = e.match(/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/);
        return 2 === (null == r ? void 0 : r.length) ? r[1] : 'Other';
      }
      function we(e = d()) {
        return /firefox\//i.test(e);
      }
      function Te(e = d()) {
        const t = e.toLowerCase();
        return (
          t.includes('safari/') &&
          !t.includes('chrome/') &&
          !t.includes('crios/') &&
          !t.includes('android')
        );
      }
      function be(e = d()) {
        return /crios\//i.test(e);
      }
      function ke(e = d()) {
        return /iemobile/i.test(e);
      }
      function Ee(e = d()) {
        return /android/i.test(e);
      }
      function Re(e = d()) {
        return /blackberry/i.test(e);
      }
      function Se(e = d()) {
        return /webos/i.test(e);
      }
      function Ae(e = d()) {
        return /iphone|ipad|ipod/i.test(e);
      }
      function Oe(e = d()) {
        return (
          Ae(e) || Ee(e) || Se(e) || Re(e) || /windows phone/i.test(e) || ke(e)
        );
      }
      function Ne(e, t = []) {
        let r;
        switch (e) {
          case 'Browser':
            r = Ie(d());
            break;
          case 'Worker':
            r = `${Ie(d())}-${e}`;
            break;
          default:
            r = e;
        }
        var n = t.length ? t.join(',') : 'FirebaseCore-web';
        return `${r}/JsCore/${ci.SDK_VERSION}/${n}`;
      }
      class Pe {
        constructor(e) {
          (this.auth = e), (this.queue = []);
        }
        pushCallback(n, e) {
          var t = (r) =>
            new Promise((e, t) => {
              try {
                e(n(r));
              } catch (e) {
                t(e);
              }
            });
          (t.onAbort = e), this.queue.push(t);
          const r = this.queue.length - 1;
          return () => {
            this.queue[r] = () => Promise.resolve();
          };
        }
        async runMiddleware(e) {
          if (this.auth.currentUser !== e) {
            const t = [];
            try {
              for (const r of this.queue)
                await r(e), r.onAbort && t.push(r.onAbort);
            } catch (e) {
              t.reverse();
              for (const n of t)
                try {
                  n();
                } catch (e) {}
              throw this.auth._errorFactory.create('login-blocked', {
                originalMessage: e.message,
              });
            }
          }
        }
      }
      class Ce {
        constructor(e, t, r) {
          (this.app = e),
            (this.heartbeatServiceProvider = t),
            (this.config = r),
            (this.currentUser = null),
            (this.emulatorConfig = null),
            (this.operations = Promise.resolve()),
            (this.authStateSubscription = new De(this)),
            (this.idTokenSubscription = new De(this)),
            (this.beforeStateQueue = new Pe(this)),
            (this.redirectUser = null),
            (this.isProactiveRefreshEnabled = !1),
            (this._canInitEmulator = !0),
            (this._isInitialized = !1),
            (this._deleted = !1),
            (this._initializationPromise = null),
            (this._popupRedirectResolver = null),
            (this._errorFactory = C),
            (this.lastNotifiedUid = void 0),
            (this.languageCode = null),
            (this.tenantId = null),
            (this.settings = { appVerificationDisabledForTesting: !1 }),
            (this.frameworks = []),
            (this.name = e.name),
            (this.clientVersion = r.sdkClientVersion);
        }
        _initializeWithPersistence(t, r) {
          return (
            r && (this._popupRedirectResolver = z(r)),
            (this._initializationPromise = this.queue(async () => {
              var e;
              if (
                !this._deleted &&
                ((this.persistenceManager = await ye.create(this, t)),
                !this._deleted)
              ) {
                if (
                  null !== (e = this._popupRedirectResolver) &&
                  void 0 !== e &&
                  e._shouldInitProactively
                )
                  try {
                    await this._popupRedirectResolver._initialize(this);
                  } catch (e) {}
                await this.initializeCurrentUser(r),
                  (this.lastNotifiedUid =
                    (null === (e = this.currentUser) || void 0 === e
                      ? void 0
                      : e.uid) || null),
                  this._deleted || (this._isInitialized = !0);
              }
            })),
            this._initializationPromise
          );
        }
        async _onStorageEvent() {
          if (!this._deleted) {
            var e = await this.assertedPersistence.getCurrentUser();
            if (this.currentUser || e)
              return this.currentUser && e && this.currentUser.uid === e.uid
                ? (this._currentUser._assign(e),
                  void (await this.currentUser.getIdToken()))
                : void (await this._updateCurrentUser(e, !0));
          }
        }
        async initializeCurrentUser(e) {
          var t,
            r,
            n,
            i = await this.assertedPersistence.getCurrentUser();
          let s = i,
            a = !1;
          if (
            (e &&
              this.config.authDomain &&
              (await this.getOrInitRedirectPersistenceManager(),
              (t =
                null === (n = this.redirectUser) || void 0 === n
                  ? void 0
                  : n._redirectEventId),
              (r = null === s || void 0 === s ? void 0 : s._redirectEventId),
              (n = await this.tryRedirectSignIn(e)),
              (t && t !== r) ||
                null == n ||
                !n.user ||
                ((s = n.user), (a = !0))),
            !s)
          )
            return this.directlySetCurrentUser(null);
          if (s._redirectEventId)
            return (
              j(this._popupRedirectResolver, this, 'argument-error'),
              await this.getOrInitRedirectPersistenceManager(),
              this.redirectUser &&
              this.redirectUser._redirectEventId === s._redirectEventId
                ? this.directlySetCurrentUser(s)
                : this.reloadAndSetCurrentUserOrClear(s)
            );
          if (a)
            try {
              await this.beforeStateQueue.runMiddleware(s);
            } catch (e) {
              (s = i),
                this._popupRedirectResolver._overrideRedirectResult(this, () =>
                  Promise.reject(e),
                );
            }
          return s
            ? this.reloadAndSetCurrentUserOrClear(s)
            : this.directlySetCurrentUser(null);
        }
        async tryRedirectSignIn(e) {
          let t = null;
          try {
            t = await this._popupRedirectResolver._completeRedirectFn(
              this,
              e,
              !0,
            );
          } catch (e) {
            await this._setRedirectUser(null);
          }
          return t;
        }
        async reloadAndSetCurrentUserOrClear(e) {
          try {
            await he(e);
          } catch (e) {
            if ('auth/network-request-failed' !== e.code)
              return this.directlySetCurrentUser(null);
          }
          return this.directlySetCurrentUser(e);
        }
        useDeviceLanguage() {
          this.languageCode = (function () {
            if ('undefined' == typeof navigator) return null;
            var e = navigator;
            return (e.languages && e.languages[0]) || e.language || null;
          })();
        }
        async _delete() {
          this._deleted = !0;
        }
        async updateCurrentUser(e) {
          const t = e ? I(e) : null;
          return (
            t &&
              j(
                t.auth.config.apiKey === this.config.apiKey,
                this,
                'invalid-user-token',
              ),
            this._updateCurrentUser(t && t._clone(this))
          );
        }
        async _updateCurrentUser(e, t = !1) {
          if (!this._deleted)
            return (
              e && j(this.tenantId === e.tenantId, this, 'tenant-id-mismatch'),
              t || (await this.beforeStateQueue.runMiddleware(e)),
              this.queue(async () => {
                await this.directlySetCurrentUser(e),
                  this.notifyAuthListeners();
              })
            );
        }
        async signOut() {
          return (
            await this.beforeStateQueue.runMiddleware(null),
            (this.redirectPersistenceManager || this._popupRedirectResolver) &&
              (await this._setRedirectUser(null)),
            this._updateCurrentUser(null, !0)
          );
        }
        setPersistence(e) {
          return this.queue(async () => {
            await this.assertedPersistence.setPersistence(z(e));
          });
        }
        _getPersistence() {
          return this.assertedPersistence.persistence.type;
        }
        _updateErrorMap(e) {
          this._errorFactory = new p('auth', 'Firebase', e());
        }
        onAuthStateChanged(e, t, r) {
          return this.registerStateListener(
            this.authStateSubscription,
            e,
            t,
            r,
          );
        }
        beforeAuthStateChanged(e, t) {
          return this.beforeStateQueue.pushCallback(e, t);
        }
        onIdTokenChanged(e, t, r) {
          return this.registerStateListener(this.idTokenSubscription, e, t, r);
        }
        toJSON() {
          var e;
          return {
            apiKey: this.config.apiKey,
            authDomain: this.config.authDomain,
            appName: this.name,
            currentUser:
              null === (e = this._currentUser) || void 0 === e
                ? void 0
                : e.toJSON(),
          };
        }
        async _setRedirectUser(e, t) {
          const r = await this.getOrInitRedirectPersistenceManager(t);
          return null === e ? r.removeCurrentUser() : r.setCurrentUser(e);
        }
        async getOrInitRedirectPersistenceManager(e) {
          var t;
          return (
            this.redirectPersistenceManager ||
              (j(
                (t = (e && z(e)) || this._popupRedirectResolver),
                this,
                'argument-error',
              ),
              (this.redirectPersistenceManager = await ye.create(
                this,
                [z(t._redirectPersistence)],
                'redirectUser',
              )),
              (this.redirectUser =
                await this.redirectPersistenceManager.getCurrentUser())),
            this.redirectPersistenceManager
          );
        }
        async _redirectUserForId(e) {
          var t;
          return (
            this._isInitialized && (await this.queue(async () => {})),
            (null === (t = this._currentUser) || void 0 === t
              ? void 0
              : t._redirectEventId) === e
              ? this._currentUser
              : (null === (t = this.redirectUser) || void 0 === t
                  ? void 0
                  : t._redirectEventId) === e
              ? this.redirectUser
              : null
          );
        }
        async _persistUserIfCurrent(e) {
          if (e === this.currentUser)
            return this.queue(async () => this.directlySetCurrentUser(e));
        }
        _notifyListenersIfCurrent(e) {
          e === this.currentUser && this.notifyAuthListeners();
        }
        _key() {
          return `${this.config.authDomain}:${this.config.apiKey}:${this.name}`;
        }
        _startProactiveRefresh() {
          (this.isProactiveRefreshEnabled = !0),
            this.currentUser && this._currentUser._startProactiveRefresh();
        }
        _stopProactiveRefresh() {
          (this.isProactiveRefreshEnabled = !1),
            this.currentUser && this._currentUser._stopProactiveRefresh();
        }
        get _currentUser() {
          return this.currentUser;
        }
        notifyAuthListeners() {
          var e;
          this._isInitialized &&
            (this.idTokenSubscription.next(this.currentUser),
            (e =
              null !==
                (e =
                  null === (e = this.currentUser) || void 0 === e
                    ? void 0
                    : e.uid) && void 0 !== e
                ? e
                : null),
            this.lastNotifiedUid !== e &&
              ((this.lastNotifiedUid = e),
              this.authStateSubscription.next(this.currentUser)));
        }
        registerStateListener(e, t, r, n) {
          if (this._deleted) return () => {};
          const i = 'function' == typeof t ? t : t.next.bind(t),
            s = this._isInitialized
              ? Promise.resolve()
              : this._initializationPromise;
          return (
            j(s, this, 'internal-error'),
            s.then(() => i(this.currentUser)),
            'function' == typeof t ? e.addObserver(t, r, n) : e.addObserver(t)
          );
        }
        async directlySetCurrentUser(e) {
          this.currentUser &&
            this.currentUser !== e &&
            (this._currentUser._stopProactiveRefresh(),
            e && this.isProactiveRefreshEnabled && e._startProactiveRefresh()),
            (this.currentUser = e)
              ? await this.assertedPersistence.setCurrentUser(e)
              : await this.assertedPersistence.removeCurrentUser();
        }
        queue(e) {
          return (
            (this.operations = this.operations.then(e, e)), this.operations
          );
        }
        get assertedPersistence() {
          return (
            j(this.persistenceManager, this, 'internal-error'),
            this.persistenceManager
          );
        }
        _logFramework(e) {
          e &&
            !this.frameworks.includes(e) &&
            (this.frameworks.push(e),
            this.frameworks.sort(),
            (this.clientVersion = Ne(
              this.config.clientPlatform,
              this._getFrameworks(),
            )));
        }
        _getFrameworks() {
          return this.frameworks;
        }
        async _getAdditionalHeaders() {
          const e = { 'X-Client-Version': this.clientVersion };
          this.app.options.appId &&
            (e['X-Firebase-gmpid'] = this.app.options.appId);
          var t = await (null ===
            (t = this.heartbeatServiceProvider.getImmediate({
              optional: !0,
            })) || void 0 === t
            ? void 0
            : t.getHeartbeatsHeader());
          return t && (e['X-Firebase-Client'] = t), e;
        }
      }
      function Le(e) {
        return I(e);
      }
      class De {
        constructor(e) {
          (this.auth = e),
            (this.observer = null),
            (this.addObserver = (function (e, t) {
              const r = new _(e, t);
              return r.subscribe.bind(r);
            })((e) => (this.observer = e)));
        }
        get next() {
          return (
            j(this.observer, this.auth, 'internal-error'),
            this.observer.next.bind(this.observer)
          );
        }
      }
      function Me(e, t, r) {
        const n = Le(e);
        j(n._canInitEmulator, n, 'emulator-config-failed'),
          j(/^https?:\/\//.test(t), n, 'invalid-emulator-scheme');
        var i = !(null == r || !r.disableWarnings);
        const s = Ue(t);
        var { host: a, port: o } = (function (e) {
          const t = Ue(e),
            r = /(\/\/)?([^?#/]+)/.exec(e.substr(t.length));
          if (!r) return { host: '', port: null };
          const n = r[2].split('@').pop() || '',
            i = /^(\[[^\]]+\])(:|$)/.exec(n);
          {
            if (i) {
              var s = i[1];
              return { host: s, port: Fe(n.substr(s.length + 1)) };
            }
            var [a, s] = n.split(':');
            return { host: a, port: Fe(s) };
          }
        })(t);
        (n.config.emulator = {
          url: `${s}//${a}${null === o ? '' : `:${o}`}/`,
        }),
          (n.settings.appVerificationDisabledForTesting = !0),
          (n.emulatorConfig = Object.freeze({
            host: a,
            port: o,
            protocol: s.replace(':', ''),
            options: Object.freeze({ disableWarnings: i }),
          })),
          i ||
            (function () {
              function e() {
                const e = document.createElement('p'),
                  t = e.style;
                (e.innerText =
                  'Running in emulator mode. Do not use with production credentials.'),
                  (t.position = 'fixed'),
                  (t.width = '100%'),
                  (t.backgroundColor = '#ffffff'),
                  (t.border = '.1em solid #000000'),
                  (t.color = '#b50000'),
                  (t.bottom = '0px'),
                  (t.left = '0px'),
                  (t.margin = '0px'),
                  (t.zIndex = '10000'),
                  (t.textAlign = 'center'),
                  e.classList.add('firebase-emulator-warning'),
                  document.body.appendChild(e);
              }
              'undefined' != typeof console &&
                'function' == typeof console.info &&
                console.info(
                  'WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.',
                );
              'undefined' != typeof window &&
                'undefined' != typeof document &&
                ('loading' === document.readyState
                  ? window.addEventListener('DOMContentLoaded', e)
                  : e());
            })();
      }
      function Ue(e) {
        var t = e.indexOf(':');
        return t < 0 ? '' : e.substr(0, t + 1);
      }
      function Fe(e) {
        if (!e) return null;
        var t = Number(e);
        return isNaN(t) ? null : t;
      }
      class xe {
        constructor(e, t) {
          (this.providerId = e), (this.signInMethod = t);
        }
        toJSON() {
          return W('not implemented');
        }
        _getIdTokenResponse(e) {
          return W('not implemented');
        }
        _linkToIdToken(e, t) {
          return W('not implemented');
        }
        _getReauthenticationResolver(e) {
          return W('not implemented');
        }
      }
      async function Ve(e, t) {
        return ee(e, 'POST', '/v1/accounts:resetPassword', Q(e, t));
      }
      async function je(e, t) {
        return ee(e, 'POST', '/v1/accounts:update', t);
      }
      async function We(e, t) {
        return ee(e, 'POST', '/v1/accounts:sendOobCode', Q(e, t));
      }
      class He extends xe {
        constructor(e, t, r, n = null) {
          super('password', r),
            (this._email = e),
            (this._password = t),
            (this._tenantId = n);
        }
        static _fromEmailAndPassword(e, t) {
          return new He(e, t, 'password');
        }
        static _fromEmailAndCode(e, t, r = null) {
          return new He(e, t, 'emailLink', r);
        }
        toJSON() {
          return {
            email: this._email,
            password: this._password,
            signInMethod: this.signInMethod,
            tenantId: this._tenantId,
          };
        }
        static fromJSON(e) {
          var t = 'string' == typeof e ? JSON.parse(e) : e;
          if (null != t && t.email && null != t && t.password) {
            if ('password' === t.signInMethod)
              return this._fromEmailAndPassword(t.email, t.password);
            if ('emailLink' === t.signInMethod)
              return this._fromEmailAndCode(t.email, t.password, t.tenantId);
          }
          return null;
        }
        async _getIdTokenResponse(e) {
          switch (this.signInMethod) {
            case 'password':
              return (async function (e, t) {
                return re(
                  e,
                  'POST',
                  '/v1/accounts:signInWithPassword',
                  Q(e, t),
                );
              })(e, {
                returnSecureToken: !0,
                email: this._email,
                password: this._password,
              });
            case 'emailLink':
              return (async function (e, t) {
                return re(
                  e,
                  'POST',
                  '/v1/accounts:signInWithEmailLink',
                  Q(e, t),
                );
              })(e, { email: this._email, oobCode: this._password });
            default:
              M(e, 'internal-error');
          }
        }
        async _linkToIdToken(e, t) {
          switch (this.signInMethod) {
            case 'password':
              return je(e, {
                idToken: t,
                returnSecureToken: !0,
                email: this._email,
                password: this._password,
              });
            case 'emailLink':
              return (async function (e, t) {
                return re(
                  e,
                  'POST',
                  '/v1/accounts:signInWithEmailLink',
                  Q(e, t),
                );
              })(e, {
                idToken: t,
                email: this._email,
                oobCode: this._password,
              });
            default:
              M(e, 'internal-error');
          }
        }
        _getReauthenticationResolver(e) {
          return this._getIdTokenResponse(e);
        }
      }
      async function qe(e, t) {
        return re(e, 'POST', '/v1/accounts:signInWithIdp', Q(e, t));
      }
      class ze extends xe {
        constructor() {
          super(...arguments), (this.pendingToken = null);
        }
        static _fromParams(e) {
          const t = new ze(e.providerId, e.signInMethod);
          return (
            e.idToken || e.accessToken
              ? (e.idToken && (t.idToken = e.idToken),
                e.accessToken && (t.accessToken = e.accessToken),
                e.nonce && !e.pendingToken && (t.nonce = e.nonce),
                e.pendingToken && (t.pendingToken = e.pendingToken))
              : e.oauthToken && e.oauthTokenSecret
              ? ((t.accessToken = e.oauthToken),
                (t.secret = e.oauthTokenSecret))
              : M('argument-error'),
            t
          );
        }
        toJSON() {
          return {
            idToken: this.idToken,
            accessToken: this.accessToken,
            secret: this.secret,
            nonce: this.nonce,
            pendingToken: this.pendingToken,
            providerId: this.providerId,
            signInMethod: this.signInMethod,
          };
        }
        static fromJSON(e) {
          var t = 'string' == typeof e ? JSON.parse(e) : e,
            { providerId: r, signInMethod: n } = t,
            t = w(t, ['providerId', 'signInMethod']);
          if (!r || !n) return null;
          const i = new ze(r, n);
          return (
            (i.idToken = t.idToken || void 0),
            (i.accessToken = t.accessToken || void 0),
            (i.secret = t.secret),
            (i.nonce = t.nonce),
            (i.pendingToken = t.pendingToken || null),
            i
          );
        }
        _getIdTokenResponse(e) {
          return qe(e, this.buildRequest());
        }
        _linkToIdToken(e, t) {
          const r = this.buildRequest();
          return (r.idToken = t), qe(e, r);
        }
        _getReauthenticationResolver(e) {
          const t = this.buildRequest();
          return (t.autoCreate = !1), qe(e, t);
        }
        buildRequest() {
          const e = { requestUri: 'http://localhost', returnSecureToken: !0 };
          if (this.pendingToken) e.pendingToken = this.pendingToken;
          else {
            const t = {};
            this.idToken && (t.id_token = this.idToken),
              this.accessToken && (t.access_token = this.accessToken),
              this.secret && (t.oauth_token_secret = this.secret),
              (t.providerId = this.providerId),
              this.nonce && !this.pendingToken && (t.nonce = this.nonce),
              (e.postBody = m(t));
          }
          return e;
        }
      }
      const Be = { USER_NOT_FOUND: 'user-not-found' };
      class Ge extends xe {
        constructor(e) {
          super('phone', 'phone'), (this.params = e);
        }
        static _fromVerification(e, t) {
          return new Ge({ verificationId: e, verificationCode: t });
        }
        static _fromTokenResponse(e, t) {
          return new Ge({ phoneNumber: e, temporaryProof: t });
        }
        _getIdTokenResponse(e) {
          return (async function (e, t) {
            return re(e, 'POST', '/v1/accounts:signInWithPhoneNumber', Q(e, t));
          })(e, this._makeVerificationRequest());
        }
        _linkToIdToken(e, t) {
          return (async function (e, t) {
            var r = await re(
              e,
              'POST',
              '/v1/accounts:signInWithPhoneNumber',
              Q(e, t),
            );
            if (r.temporaryProof)
              throw se(e, 'account-exists-with-different-credential', r);
            return r;
          })(e, Object.assign({ idToken: t }, this._makeVerificationRequest()));
        }
        _getReauthenticationResolver(e) {
          return (async function (e, t) {
            return re(
              e,
              'POST',
              '/v1/accounts:signInWithPhoneNumber',
              Q(
                e,
                Object.assign(Object.assign({}, t), { operation: 'REAUTH' }),
              ),
              Be,
            );
          })(e, this._makeVerificationRequest());
        }
        _makeVerificationRequest() {
          var {
            temporaryProof: e,
            phoneNumber: t,
            verificationId: r,
            verificationCode: n,
          } = this.params;
          return e && t
            ? { temporaryProof: e, phoneNumber: t }
            : { sessionInfo: r, code: n };
        }
        toJSON() {
          const e = { providerId: this.providerId };
          return (
            this.params.phoneNumber &&
              (e.phoneNumber = this.params.phoneNumber),
            this.params.temporaryProof &&
              (e.temporaryProof = this.params.temporaryProof),
            this.params.verificationCode &&
              (e.verificationCode = this.params.verificationCode),
            this.params.verificationId &&
              (e.verificationId = this.params.verificationId),
            e
          );
        }
        static fromJSON(e) {
          var {
            verificationId: t,
            verificationCode: r,
            phoneNumber: n,
            temporaryProof: i,
          } = (e = 'string' == typeof e ? JSON.parse(e) : e);
          return r || t || n || i
            ? new Ge({
                verificationId: t,
                verificationCode: r,
                phoneNumber: n,
                temporaryProof: i,
              })
            : null;
        }
      }
      class Ke {
        constructor(e) {
          var t = v(g(e)),
            r = null !== (n = t.apiKey) && void 0 !== n ? n : null,
            n = null !== (i = t.oobCode) && void 0 !== i ? i : null,
            i = (function (e) {
              switch (e) {
                case 'recoverEmail':
                  return 'RECOVER_EMAIL';
                case 'resetPassword':
                  return 'PASSWORD_RESET';
                case 'signIn':
                  return 'EMAIL_SIGNIN';
                case 'verifyEmail':
                  return 'VERIFY_EMAIL';
                case 'verifyAndChangeEmail':
                  return 'VERIFY_AND_CHANGE_EMAIL';
                case 'revertSecondFactorAddition':
                  return 'REVERT_SECOND_FACTOR_ADDITION';
                default:
                  return null;
              }
            })(null !== (i = t.mode) && void 0 !== i ? i : null);
          j(r && n && i, 'argument-error'),
            (this.apiKey = r),
            (this.operation = i),
            (this.code = n),
            (this.continueUrl =
              null !== (n = t.continueUrl) && void 0 !== n ? n : null),
            (this.languageCode =
              null !== (n = t.languageCode) && void 0 !== n ? n : null),
            (this.tenantId =
              null !== (t = t.tenantId) && void 0 !== t ? t : null);
        }
        static parseLink(e) {
          var t,
            r,
            n,
            t =
              ((t = v(g((e = e))).link),
              (r = t ? v(g(t)).deep_link_id : null),
              ((n = v(g(e)).deep_link_id) ? v(g(n)).link : null) ||
                n ||
                r ||
                t ||
                e);
          try {
            return new Ke(t);
          } catch (e) {
            return null;
          }
        }
      }
      class $e {
        constructor() {
          this.providerId = $e.PROVIDER_ID;
        }
        static credential(e, t) {
          return He._fromEmailAndPassword(e, t);
        }
        static credentialWithLink(e, t) {
          var r = Ke.parseLink(t);
          return (
            j(r, 'argument-error'), He._fromEmailAndCode(e, r.code, r.tenantId)
          );
        }
      }
      ($e.PROVIDER_ID = 'password'),
        ($e.EMAIL_PASSWORD_SIGN_IN_METHOD = 'password'),
        ($e.EMAIL_LINK_SIGN_IN_METHOD = 'emailLink');
      class Je {
        constructor(e) {
          (this.providerId = e),
            (this.defaultLanguageCode = null),
            (this.customParameters = {});
        }
        setDefaultLanguage(e) {
          this.defaultLanguageCode = e;
        }
        setCustomParameters(e) {
          return (this.customParameters = e), this;
        }
        getCustomParameters() {
          return this.customParameters;
        }
      }
      class Ye extends Je {
        constructor() {
          super(...arguments), (this.scopes = []);
        }
        addScope(e) {
          return this.scopes.includes(e) || this.scopes.push(e), this;
        }
        getScopes() {
          return [...this.scopes];
        }
      }
      class Xe extends Ye {
        static credentialFromJSON(e) {
          var t = 'string' == typeof e ? JSON.parse(e) : e;
          return (
            j('providerId' in t && 'signInMethod' in t, 'argument-error'),
            ze._fromParams(t)
          );
        }
        credential(e) {
          return this._credential(
            Object.assign(Object.assign({}, e), { nonce: e.rawNonce }),
          );
        }
        _credential(e) {
          return (
            j(e.idToken || e.accessToken, 'argument-error'),
            ze._fromParams(
              Object.assign(Object.assign({}, e), {
                providerId: this.providerId,
                signInMethod: this.providerId,
              }),
            )
          );
        }
        static credentialFromResult(e) {
          return Xe.oauthCredentialFromTaggedObject(e);
        }
        static credentialFromError(e) {
          return Xe.oauthCredentialFromTaggedObject(e.customData || {});
        }
        static oauthCredentialFromTaggedObject({ _tokenResponse: e }) {
          if (!e) return null;
          var {
            oauthIdToken: t,
            oauthAccessToken: r,
            oauthTokenSecret: n,
            pendingToken: i,
            nonce: s,
            providerId: a,
          } = e;
          if (!(r || n || t || i)) return null;
          if (!a) return null;
          try {
            return new Xe(a)._credential({
              idToken: t,
              accessToken: r,
              nonce: s,
              pendingToken: i,
            });
          } catch (e) {
            return null;
          }
        }
      }
      class Ze extends Ye {
        constructor() {
          super('facebook.com');
        }
        static credential(e) {
          return ze._fromParams({
            providerId: Ze.PROVIDER_ID,
            signInMethod: Ze.FACEBOOK_SIGN_IN_METHOD,
            accessToken: e,
          });
        }
        static credentialFromResult(e) {
          return Ze.credentialFromTaggedObject(e);
        }
        static credentialFromError(e) {
          return Ze.credentialFromTaggedObject(e.customData || {});
        }
        static credentialFromTaggedObject({ _tokenResponse: e }) {
          if (!(e && 'oauthAccessToken' in e)) return null;
          if (!e.oauthAccessToken) return null;
          try {
            return Ze.credential(e.oauthAccessToken);
          } catch (e) {
            return null;
          }
        }
      }
      (Ze.FACEBOOK_SIGN_IN_METHOD = 'facebook.com'),
        (Ze.PROVIDER_ID = 'facebook.com');
      class Qe extends Ye {
        constructor() {
          super('google.com'), this.addScope('profile');
        }
        static credential(e, t) {
          return ze._fromParams({
            providerId: Qe.PROVIDER_ID,
            signInMethod: Qe.GOOGLE_SIGN_IN_METHOD,
            idToken: e,
            accessToken: t,
          });
        }
        static credentialFromResult(e) {
          return Qe.credentialFromTaggedObject(e);
        }
        static credentialFromError(e) {
          return Qe.credentialFromTaggedObject(e.customData || {});
        }
        static credentialFromTaggedObject({ _tokenResponse: e }) {
          if (!e) return null;
          var { oauthIdToken: t, oauthAccessToken: r } = e;
          if (!t && !r) return null;
          try {
            return Qe.credential(t, r);
          } catch (e) {
            return null;
          }
        }
      }
      (Qe.GOOGLE_SIGN_IN_METHOD = 'google.com'),
        (Qe.PROVIDER_ID = 'google.com');
      class et extends Ye {
        constructor() {
          super('github.com');
        }
        static credential(e) {
          return ze._fromParams({
            providerId: et.PROVIDER_ID,
            signInMethod: et.GITHUB_SIGN_IN_METHOD,
            accessToken: e,
          });
        }
        static credentialFromResult(e) {
          return et.credentialFromTaggedObject(e);
        }
        static credentialFromError(e) {
          return et.credentialFromTaggedObject(e.customData || {});
        }
        static credentialFromTaggedObject({ _tokenResponse: e }) {
          if (!(e && 'oauthAccessToken' in e)) return null;
          if (!e.oauthAccessToken) return null;
          try {
            return et.credential(e.oauthAccessToken);
          } catch (e) {
            return null;
          }
        }
      }
      (et.GITHUB_SIGN_IN_METHOD = 'github.com'),
        (et.PROVIDER_ID = 'github.com');
      class tt extends xe {
        constructor(e, t) {
          super(e, e), (this.pendingToken = t);
        }
        _getIdTokenResponse(e) {
          return qe(e, this.buildRequest());
        }
        _linkToIdToken(e, t) {
          const r = this.buildRequest();
          return (r.idToken = t), qe(e, r);
        }
        _getReauthenticationResolver(e) {
          const t = this.buildRequest();
          return (t.autoCreate = !1), qe(e, t);
        }
        toJSON() {
          return {
            signInMethod: this.signInMethod,
            providerId: this.providerId,
            pendingToken: this.pendingToken,
          };
        }
        static fromJSON(e) {
          var {
            providerId: t,
            signInMethod: r,
            pendingToken: n,
          } = 'string' == typeof e ? JSON.parse(e) : e;
          return t && r && n && t === r ? new tt(t, n) : null;
        }
        static _create(e, t) {
          return new tt(e, t);
        }
        buildRequest() {
          return {
            requestUri: 'http://localhost',
            returnSecureToken: !0,
            pendingToken: this.pendingToken,
          };
        }
      }
      class rt extends Je {
        constructor(e) {
          j(e.startsWith('saml.'), 'argument-error'), super(e);
        }
        static credentialFromResult(e) {
          return rt.samlCredentialFromTaggedObject(e);
        }
        static credentialFromError(e) {
          return rt.samlCredentialFromTaggedObject(e.customData || {});
        }
        static credentialFromJSON(e) {
          var t = tt.fromJSON(e);
          return j(t, 'argument-error'), t;
        }
        static samlCredentialFromTaggedObject({ _tokenResponse: e }) {
          if (!e) return null;
          var { pendingToken: t, providerId: r } = e;
          if (!t || !r) return null;
          try {
            return tt._create(r, t);
          } catch (e) {
            return null;
          }
        }
      }
      class nt extends Ye {
        constructor() {
          super('twitter.com');
        }
        static credential(e, t) {
          return ze._fromParams({
            providerId: nt.PROVIDER_ID,
            signInMethod: nt.TWITTER_SIGN_IN_METHOD,
            oauthToken: e,
            oauthTokenSecret: t,
          });
        }
        static credentialFromResult(e) {
          return nt.credentialFromTaggedObject(e);
        }
        static credentialFromError(e) {
          return nt.credentialFromTaggedObject(e.customData || {});
        }
        static credentialFromTaggedObject({ _tokenResponse: e }) {
          if (!e) return null;
          var { oauthAccessToken: t, oauthTokenSecret: r } = e;
          if (!t || !r) return null;
          try {
            return nt.credential(t, r);
          } catch (e) {
            return null;
          }
        }
      }
      async function it(e, t) {
        return re(e, 'POST', '/v1/accounts:signUp', Q(e, t));
      }
      (nt.TWITTER_SIGN_IN_METHOD = 'twitter.com'),
        (nt.PROVIDER_ID = 'twitter.com');
      class st {
        constructor(e) {
          (this.user = e.user),
            (this.providerId = e.providerId),
            (this._tokenResponse = e._tokenResponse),
            (this.operationType = e.operationType);
        }
        static async _fromIdTokenResponse(e, t, r, n = !1) {
          var i = await me._fromIdTokenResponse(e, r, n),
            s = at(r);
          return new st({
            user: i,
            providerId: s,
            _tokenResponse: r,
            operationType: t,
          });
        }
        static async _forOperation(e, t, r) {
          await e._updateTokensIfNecessary(r, !0);
          var n = at(r);
          return new st({
            user: e,
            providerId: n,
            _tokenResponse: r,
            operationType: t,
          });
        }
      }
      function at(e) {
        return e.providerId || ('phoneNumber' in e ? 'phone' : null);
      }
      class ot extends h {
        constructor(e, t, r, n) {
          var i;
          super(t.code, t.message),
            (this.operationType = r),
            (this.user = n),
            Object.setPrototypeOf(this, ot.prototype),
            (this.customData = {
              appName: e.name,
              tenantId: null !== (i = e.tenantId) && void 0 !== i ? i : void 0,
              _serverResponse: t.customData._serverResponse,
              operationType: r,
            });
        }
        static _fromErrorAndOperation(e, t, r, n) {
          return new ot(e, t, r, n);
        }
      }
      function ct(t, r, e, n) {
        const i =
          'reauthenticate' === r
            ? e._getReauthenticationResolver(t)
            : e._getIdTokenResponse(t);
        return i.catch((e) => {
          if ('auth/multi-factor-auth-required' === e.code)
            throw ot._fromErrorAndOperation(t, e, r, n);
          throw e;
        });
      }
      function lt(e) {
        return new Set(e.map(({ providerId: e }) => e).filter((e) => !!e));
      }
      async function ut(e, t) {
        const r = I(e);
        await ht(!0, r, t);
        var n = ((e = r.auth),
        (t = { idToken: await r.getIdToken(), deleteProvider: [t] }),
        await ee(e, 'POST', '/v1/accounts:update', t))['providerUserInfo'];
        const i = lt(n || []);
        return (
          (r.providerData = r.providerData.filter((e) => i.has(e.providerId))),
          i.has('phone') || (r.phoneNumber = null),
          await r.auth._persistUserIfCurrent(r),
          r
        );
      }
      async function dt(e, t, r = !1) {
        var n = await le(e, t._linkToIdToken(e.auth, await e.getIdToken()), r);
        return st._forOperation(e, 'link', n);
      }
      async function ht(e, t, r) {
        await he(t);
        const n = lt(t.providerData);
        var i = !1 === e ? 'provider-already-linked' : 'no-such-provider';
        j(n.has(r) === e, t.auth, i);
      }
      async function pt(e, t, r = !1) {
        var n = e['auth'],
          i = 'reauthenticate';
        try {
          var s = await le(e, ct(n, i, t, e), r);
          j(s.idToken, n, 'internal-error');
          var a = ce(s.idToken);
          j(a, n, 'internal-error');
          var o = a['sub'];
          return j(e.uid === o, n, 'user-mismatch'), st._forOperation(e, i, s);
        } catch (e) {
          throw (
            ('auth/user-not-found' === (null == e ? void 0 : e.code) &&
              M(n, 'user-mismatch'),
            e)
          );
        }
      }
      async function ft(e, t, r = !1) {
        var n = await ct(e, 'signIn', t),
          n = await st._fromIdTokenResponse(e, 'signIn', n);
        return r || (await e._updateCurrentUser(n.user)), n;
      }
      async function mt(e, t) {
        return ft(Le(e), t);
      }
      async function vt(e, t) {
        var r = I(e);
        return await ht(!1, r, t.providerId), dt(r, t);
      }
      async function gt(e, t) {
        return pt(I(e), t);
      }
      async function _t(e, t) {
        const r = Le(e);
        var n = await re(
            r,
            'POST',
            '/v1/accounts:signInWithCustomToken',
            Q(r, { token: t, returnSecureToken: !0 }),
          ),
          n = await st._fromIdTokenResponse(r, 'signIn', n);
        return await r._updateCurrentUser(n.user), n;
      }
      class yt {
        constructor(e, t) {
          (this.factorId = e),
            (this.uid = t.mfaEnrollmentId),
            (this.enrollmentTime = new Date(t.enrolledAt).toUTCString()),
            (this.displayName = t.displayName);
        }
        static _fromServerResponse(e, t) {
          return 'phoneInfo' in t
            ? It._fromServerResponse(e, t)
            : M(e, 'internal-error');
        }
      }
      class It extends yt {
        constructor(e) {
          super('phone', e), (this.phoneNumber = e.phoneInfo);
        }
        static _fromServerResponse(e, t) {
          return new It(t);
        }
      }
      function wt(e, t, r) {
        var n;
        j(
          0 < (null === (n = r.url) || void 0 === n ? void 0 : n.length),
          e,
          'invalid-continue-uri',
        ),
          j(
            void 0 === r.dynamicLinkDomain || 0 < r.dynamicLinkDomain.length,
            e,
            'invalid-dynamic-link-domain',
          ),
          (t.continueUrl = r.url),
          (t.dynamicLinkDomain = r.dynamicLinkDomain),
          (t.canHandleCodeInApp = r.handleCodeInApp),
          r.iOS &&
            (j(0 < r.iOS.bundleId.length, e, 'missing-ios-bundle-id'),
            (t.iOSBundleId = r.iOS.bundleId)),
          r.android &&
            (j(0 < r.android.packageName.length, e, 'missing-android-pkg-name'),
            (t.androidInstallApp = r.android.installApp),
            (t.androidMinimumVersionCode = r.android.minimumVersion),
            (t.androidPackageName = r.android.packageName));
      }
      async function Tt(e, t, r) {
        var n = I(e),
          i = { requestType: 'PASSWORD_RESET', email: t };
        r && wt(n, i, r), await We(n, i);
      }
      async function bt(e, t) {
        await ee(
          (e = I(e)),
          'POST',
          '/v1/accounts:update',
          Q(e, { oobCode: t }),
        );
      }
      async function kt(e, t) {
        var r = I(e),
          n = await Ve(r, { oobCode: t }),
          i = n.requestType;
        switch ((j(i, r, 'internal-error'), i)) {
          case 'EMAIL_SIGNIN':
            break;
          case 'VERIFY_AND_CHANGE_EMAIL':
            j(n.newEmail, r, 'internal-error');
            break;
          case 'REVERT_SECOND_FACTOR_ADDITION':
            j(n.mfaInfo, r, 'internal-error');
          default:
            j(n.email, r, 'internal-error');
        }
        let s = null;
        return (
          n.mfaInfo && (s = yt._fromServerResponse(Le(r), n.mfaInfo)),
          {
            data: {
              email:
                ('VERIFY_AND_CHANGE_EMAIL' === n.requestType
                  ? n.newEmail
                  : n.email) || null,
              previousEmail:
                ('VERIFY_AND_CHANGE_EMAIL' === n.requestType
                  ? n.email
                  : n.newEmail) || null,
              multiFactorInfo: s,
            },
            operation: i,
          }
        );
      }
      async function Et(e, t, r) {
        var n = I(e),
          i = { requestType: 'EMAIL_SIGNIN', email: t };
        j(r.handleCodeInApp, n, 'argument-error'),
          r && wt(n, i, r),
          await We(n, i);
      }
      async function Rt(e, t) {
        var r = G() ? B() : 'http://localhost',
          r = (
            await ee(
              (e = I(e)),
              'POST',
              '/v1/accounts:createAuthUri',
              Q(e, { identifier: t, continueUri: r }),
            )
          )['signinMethods'];
        return r || [];
      }
      async function St(e, t) {
        var r = I(e),
          n = { requestType: 'VERIFY_EMAIL', idToken: await e.getIdToken() };
        t && wt(r.auth, n, t);
        var n = (await We(r.auth, n))['email'];
        n !== e.email && (await e.reload());
      }
      async function At(e, t, r) {
        var n = I(e),
          i = {
            requestType: 'VERIFY_AND_CHANGE_EMAIL',
            idToken: await e.getIdToken(),
            newEmail: t,
          };
        r && wt(n.auth, i, r);
        var i = (await We(n.auth, i))['email'];
        i !== e.email && (await e.reload());
      }
      async function Ot(e, { displayName: t, photoURL: r }) {
        if (void 0 !== t || void 0 !== r) {
          const i = I(e);
          var n = await i.getIdToken(),
            n = await le(
              i,
              (async function (e, t) {
                return ee(e, 'POST', '/v1/accounts:update', t);
              })(i.auth, {
                idToken: n,
                displayName: t,
                photoUrl: r,
                returnSecureToken: !0,
              }),
            );
          (i.displayName = n.displayName || null),
            (i.photoURL = n.photoUrl || null);
          const s = i.providerData.find(
            ({ providerId: e }) => 'password' === e,
          );
          s && ((s.displayName = i.displayName), (s.photoURL = i.photoURL)),
            await i._updateTokensIfNecessary(n);
        }
      }
      async function Nt(e, t, r) {
        var n = e['auth'];
        const i = { idToken: await e.getIdToken(), returnSecureToken: !0 };
        t && (i.email = t), r && (i.password = r);
        n = await le(e, je(n, i));
        await e._updateTokensIfNecessary(n, !0);
      }
      class Pt {
        constructor(e, t, r = {}) {
          (this.isNewUser = e), (this.providerId = t), (this.profile = r);
        }
      }
      class Ct extends Pt {
        constructor(e, t, r, n) {
          super(e, t, r), (this.username = n);
        }
      }
      class Lt extends Pt {
        constructor(e, t) {
          super(e, 'facebook.com', t);
        }
      }
      class Dt extends Ct {
        constructor(e, t) {
          super(
            e,
            'github.com',
            t,
            'string' == typeof (null == t ? void 0 : t.login)
              ? null == t
                ? void 0
                : t.login
              : null,
          );
        }
      }
      class Mt extends Pt {
        constructor(e, t) {
          super(e, 'google.com', t);
        }
      }
      class Ut extends Ct {
        constructor(e, t, r) {
          super(e, 'twitter.com', t, r);
        }
      }
      function Ft(e) {
        var { user: t, _tokenResponse: r } = e;
        return t.isAnonymous && !r
          ? { providerId: null, isNewUser: !1, profile: null }
          : (function (e) {
              if (!e) return null;
              var t = e['providerId'],
                r = e.rawUserInfo ? JSON.parse(e.rawUserInfo) : {},
                n =
                  e.isNewUser ||
                  'identitytoolkit#SignupNewUserResponse' === e.kind;
              if (!t && null != e && e.idToken) {
                var i =
                  null ===
                    (i =
                      null === (i = ce(e.idToken)) || void 0 === i
                        ? void 0
                        : i.firebase) || void 0 === i
                    ? void 0
                    : i.sign_in_provider;
                if (i) {
                  i = 'anonymous' !== i && 'custom' !== i ? i : null;
                  return new Pt(n, i);
                }
              }
              if (!t) return null;
              switch (t) {
                case 'facebook.com':
                  return new Lt(n, r);
                case 'github.com':
                  return new Dt(n, r);
                case 'google.com':
                  return new Mt(n, r);
                case 'twitter.com':
                  return new Ut(n, r, e.screenName || null);
                case 'custom':
                case 'anonymous':
                  return new Pt(n, null);
                default:
                  return new Pt(n, t, r);
              }
            })(r);
      }
      class xt {
        constructor(e, t) {
          (this.type = e), (this.credential = t);
        }
        static _fromIdtoken(e) {
          return new xt('enroll', e);
        }
        static _fromMfaPendingCredential(e) {
          return new xt('signin', e);
        }
        toJSON() {
          return {
            multiFactorSession: {
              ['enroll' === this.type ? 'idToken' : 'pendingCredential']:
                this.credential,
            },
          };
        }
        static fromJSON(e) {
          var t;
          if (null != e && e.multiFactorSession) {
            if (
              null !== (t = e.multiFactorSession) &&
              void 0 !== t &&
              t.pendingCredential
            )
              return xt._fromMfaPendingCredential(
                e.multiFactorSession.pendingCredential,
              );
            if (
              null !== (t = e.multiFactorSession) &&
              void 0 !== t &&
              t.idToken
            )
              return xt._fromIdtoken(e.multiFactorSession.idToken);
          }
          return null;
        }
      }
      class Vt {
        constructor(e, t, r) {
          (this.session = e), (this.hints = t), (this.signInResolver = r);
        }
        static _fromError(e, i) {
          const s = Le(e),
            a = i.customData._serverResponse;
          var t = (a.mfaInfo || []).map((e) => yt._fromServerResponse(s, e));
          j(a.mfaPendingCredential, s, 'internal-error');
          const o = xt._fromMfaPendingCredential(a.mfaPendingCredential);
          return new Vt(o, t, async (e) => {
            var t = await e._process(s, o);
            delete a.mfaInfo, delete a.mfaPendingCredential;
            var r = Object.assign(Object.assign({}, a), {
              idToken: t.idToken,
              refreshToken: t.refreshToken,
            });
            switch (i.operationType) {
              case 'signIn':
                var n = await st._fromIdTokenResponse(s, i.operationType, r);
                return await s._updateCurrentUser(n.user), n;
              case 'reauthenticate':
                return (
                  j(i.user, s, 'internal-error'),
                  st._forOperation(i.user, i.operationType, r)
                );
              default:
                M(s, 'internal-error');
            }
          });
        }
        async resolveSignIn(e) {
          return this.signInResolver(e);
        }
      }
      class jt {
        constructor(t) {
          (this.user = t),
            (this.enrolledFactors = []),
            t._onReload((e) => {
              e.mfaInfo &&
                (this.enrolledFactors = e.mfaInfo.map((e) =>
                  yt._fromServerResponse(t.auth, e),
                ));
            });
        }
        static _fromUser(e) {
          return new jt(e);
        }
        async getSession() {
          return xt._fromIdtoken(await this.user.getIdToken());
        }
        async enroll(e, t) {
          const r = e;
          var n = await this.getSession(),
            n = await le(this.user, r._process(this.user.auth, n, t));
          return (
            await this.user._updateTokensIfNecessary(n), this.user.reload()
          );
        }
        async unenroll(e) {
          const t = 'string' == typeof e ? e : e.uid;
          var r,
            n = await this.user.getIdToken(),
            n = await le(
              this.user,
              ((r = this.user.auth),
              (e = { idToken: n, mfaEnrollmentId: t }),
              ee(r, 'POST', '/v2/accounts/mfaEnrollment:withdraw', Q(r, e))),
            );
          (this.enrolledFactors = this.enrolledFactors.filter(
            ({ uid: e }) => e !== t,
          )),
            await this.user._updateTokensIfNecessary(n);
          try {
            await this.user.reload();
          } catch (e) {
            if ('auth/user-token-expired' !== e.code) throw e;
          }
        }
      }
      const Wt = new WeakMap();
      const Ht = '__sak';
      class qt {
        constructor(e, t) {
          (this.storageRetriever = e), (this.type = t);
        }
        _isAvailable() {
          try {
            return this.storage
              ? (this.storage.setItem(Ht, '1'),
                this.storage.removeItem(Ht),
                Promise.resolve(!0))
              : Promise.resolve(!1);
          } catch (e) {
            return Promise.resolve(!1);
          }
        }
        _set(e, t) {
          return this.storage.setItem(e, JSON.stringify(t)), Promise.resolve();
        }
        _get(e) {
          var t = this.storage.getItem(e);
          return Promise.resolve(t ? JSON.parse(t) : null);
        }
        _remove(e) {
          return this.storage.removeItem(e), Promise.resolve();
        }
        get storage() {
          return this.storageRetriever();
        }
      }
      class zt extends qt {
        constructor() {
          var e;
          super(() => window.localStorage, 'LOCAL'),
            (this.boundEventHandler = (e, t) => this.onStorageEvent(e, t)),
            (this.listeners = {}),
            (this.localCache = {}),
            (this.pollTimer = null),
            (this.safariLocalStorageNotSynced =
              (Te((e = d())) || Ae(e)) &&
              (function () {
                try {
                  return !(!window || window === window.top);
                } catch (e) {
                  return !1;
                }
              })()),
            (this.fallbackToPolling = Oe()),
            (this._shouldAllowMigration = !0);
        }
        forAllChangedKeys(e) {
          for (const n of Object.keys(this.listeners)) {
            var t = this.storage.getItem(n),
              r = this.localCache[n];
            t !== r && e(n, r, t);
          }
        }
        onStorageEvent(e, t = !1) {
          if (e.key) {
            const n = e.key;
            if (
              (t ? this.detachListener() : this.stopPolling(),
              this.safariLocalStorageNotSynced)
            ) {
              const i = this.storage.getItem(n);
              if (e.newValue !== i)
                null !== e.newValue
                  ? this.storage.setItem(n, e.newValue)
                  : this.storage.removeItem(n);
              else if (this.localCache[n] === e.newValue && !t) return;
            }
            var r = () => {
              var e = this.storage.getItem(n);
              (!t && this.localCache[n] === e) || this.notifyListeners(n, e);
            };
            const i = this.storage.getItem(n);
            l() &&
            10 === document.documentMode &&
            i !== e.newValue &&
            e.newValue !== e.oldValue
              ? setTimeout(r, 10)
              : r();
          } else
            this.forAllChangedKeys((e, t, r) => {
              this.notifyListeners(e, r);
            });
        }
        notifyListeners(e, t) {
          this.localCache[e] = t;
          var r = this.listeners[e];
          if (r) for (const n of Array.from(r)) n(t && JSON.parse(t));
        }
        startPolling() {
          this.stopPolling(),
            (this.pollTimer = setInterval(() => {
              this.forAllChangedKeys((e, t, r) => {
                this.onStorageEvent(
                  new StorageEvent('storage', {
                    key: e,
                    oldValue: t,
                    newValue: r,
                  }),
                  !0,
                );
              });
            }, 1e3));
        }
        stopPolling() {
          this.pollTimer &&
            (clearInterval(this.pollTimer), (this.pollTimer = null));
        }
        attachListener() {
          window.addEventListener('storage', this.boundEventHandler);
        }
        detachListener() {
          window.removeEventListener('storage', this.boundEventHandler);
        }
        _addListener(e, t) {
          0 === Object.keys(this.listeners).length &&
            (this.fallbackToPolling
              ? this.startPolling()
              : this.attachListener()),
            this.listeners[e] ||
              ((this.listeners[e] = new Set()),
              (this.localCache[e] = this.storage.getItem(e))),
            this.listeners[e].add(t);
        }
        _removeListener(e, t) {
          this.listeners[e] &&
            (this.listeners[e].delete(t),
            0 === this.listeners[e].size && delete this.listeners[e]),
            0 === Object.keys(this.listeners).length &&
              (this.detachListener(), this.stopPolling());
        }
        async _set(e, t) {
          await super._set(e, t), (this.localCache[e] = JSON.stringify(t));
        }
        async _get(e) {
          var t = await super._get(e);
          return (this.localCache[e] = JSON.stringify(t)), t;
        }
        async _remove(e) {
          await super._remove(e), delete this.localCache[e];
        }
      }
      zt.type = 'LOCAL';
      const Bt = zt;
      class Gt extends qt {
        constructor() {
          super(() => window.sessionStorage, 'SESSION');
        }
        _addListener(e, t) {}
        _removeListener(e, t) {}
      }
      Gt.type = 'SESSION';
      const Kt = Gt;
      class $t {
        constructor(e) {
          (this.eventTarget = e),
            (this.handlersMap = {}),
            (this.boundEventHandler = this.handleEvent.bind(this));
        }
        static _getInstance(t) {
          var e = this.receivers.find((e) => e.isListeningto(t));
          if (e) return e;
          e = new $t(t);
          return this.receivers.push(e), e;
        }
        isListeningto(e) {
          return this.eventTarget === e;
        }
        async handleEvent(e) {
          const t = e,
            { eventId: r, eventType: n, data: i } = t.data;
          var s = this.handlersMap[n];
          null != s &&
            s.size &&
            (t.ports[0].postMessage({
              status: 'ack',
              eventId: r,
              eventType: n,
            }),
            (s = Array.from(s).map(async (e) => e(t.origin, i))),
            (s = await Promise.all(
              s.map(async (e) => {
                try {
                  return { fulfilled: !0, value: await e };
                } catch (e) {
                  return { fulfilled: !1, reason: e };
                }
              }),
            )),
            t.ports[0].postMessage({
              status: 'done',
              eventId: r,
              eventType: n,
              response: s,
            }));
        }
        _subscribe(e, t) {
          0 === Object.keys(this.handlersMap).length &&
            this.eventTarget.addEventListener(
              'message',
              this.boundEventHandler,
            ),
            this.handlersMap[e] || (this.handlersMap[e] = new Set()),
            this.handlersMap[e].add(t);
        }
        _unsubscribe(e, t) {
          this.handlersMap[e] && t && this.handlersMap[e].delete(t),
            (t && 0 !== this.handlersMap[e].size) || delete this.handlersMap[e],
            0 === Object.keys(this.handlersMap).length &&
              this.eventTarget.removeEventListener(
                'message',
                this.boundEventHandler,
              );
        }
      }
      function Jt(e = '', t = 10) {
        let r = '';
        for (let n = 0; n < t; n++) r += Math.floor(10 * Math.random());
        return e + r;
      }
      $t.receivers = [];
      class Yt {
        constructor(e) {
          (this.target = e), (this.handlers = new Set());
        }
        removeMessageHandler(e) {
          e.messageChannel &&
            (e.messageChannel.port1.removeEventListener('message', e.onMessage),
            e.messageChannel.port1.close()),
            this.handlers.delete(e);
        }
        async _send(e, t, a = 50) {
          const o =
            'undefined' != typeof MessageChannel ? new MessageChannel() : null;
          if (!o) throw new Error('connection_unavailable');
          let c, l;
          return new Promise((r, n) => {
            const i = Jt('', 20);
            o.port1.start();
            const s = setTimeout(() => {
              n(new Error('unsupported_event'));
            }, a);
            (l = {
              messageChannel: o,
              onMessage(e) {
                var t = e;
                if (t.data.eventId === i)
                  switch (t.data.status) {
                    case 'ack':
                      clearTimeout(s),
                        (c = setTimeout(() => {
                          n(new Error('timeout'));
                        }, 3e3));
                      break;
                    case 'done':
                      clearTimeout(c), r(t.data.response);
                      break;
                    default:
                      clearTimeout(s),
                        clearTimeout(c),
                        n(new Error('invalid_response'));
                  }
              },
            }),
              this.handlers.add(l),
              o.port1.addEventListener('message', l.onMessage),
              this.target.postMessage({ eventType: e, eventId: i, data: t }, [
                o.port2,
              ]);
          }).finally(() => {
            l && this.removeMessageHandler(l);
          });
        }
      }
      function Xt() {
        return window;
      }
      function Zt() {
        return (
          void 0 !== Xt().WorkerGlobalScope &&
          'function' == typeof Xt().importScripts
        );
      }
      const Qt = 'firebaseLocalStorageDb',
        er = 'firebaseLocalStorage',
        tr = 'fbase_key';
      class rr {
        constructor(e) {
          this.request = e;
        }
        toPromise() {
          return new Promise((e, t) => {
            this.request.addEventListener('success', () => {
              e(this.request.result);
            }),
              this.request.addEventListener('error', () => {
                t(this.request.error);
              });
          });
        }
      }
      function nr(e, t) {
        return e
          .transaction([er], t ? 'readwrite' : 'readonly')
          .objectStore(er);
      }
      function ir() {
        const n = indexedDB.open(Qt, 1);
        return new Promise((r, t) => {
          n.addEventListener('error', () => {
            t(n.error);
          }),
            n.addEventListener('upgradeneeded', () => {
              const e = n.result;
              try {
                e.createObjectStore(er, { keyPath: tr });
              } catch (e) {
                t(e);
              }
            }),
            n.addEventListener('success', async () => {
              const e = n.result;
              var t;
              e.objectStoreNames.contains(er)
                ? r(e)
                : (e.close(),
                  (t = indexedDB.deleteDatabase(Qt)),
                  await new rr(t).toPromise(),
                  r(await ir()));
            });
        });
      }
      async function sr(e, t, r) {
        var n = nr(e, !0).put({ fbase_key: t, value: r });
        return new rr(n).toPromise();
      }
      function ar(e, t) {
        var r = nr(e, !0).delete(t);
        return new rr(r).toPromise();
      }
      class or {
        constructor() {
          (this.type = 'LOCAL'),
            (this._shouldAllowMigration = !0),
            (this.listeners = {}),
            (this.localCache = {}),
            (this.pollTimer = null),
            (this.pendingWrites = 0),
            (this.receiver = null),
            (this.sender = null),
            (this.serviceWorkerReceiverAvailable = !1),
            (this.activeServiceWorker = null),
            (this._workerInitializationPromise =
              this.initializeServiceWorkerMessaging().then(
                () => {},
                () => {},
              ));
        }
        async _openDb() {
          return this.db || ((this.db = await ir()), this.db);
        }
        async _withRetries(e) {
          let t = 0;
          for (;;)
            try {
              return e(await this._openDb());
            } catch (e) {
              if (3 < t++) throw e;
              this.db && (this.db.close(), (this.db = void 0));
            }
        }
        async initializeServiceWorkerMessaging() {
          return Zt() ? this.initializeReceiver() : this.initializeSender();
        }
        async initializeReceiver() {
          (this.receiver = $t._getInstance(Zt() ? self : null)),
            this.receiver._subscribe('keyChanged', async (e, t) => {
              const r = await this._poll();
              return { keyProcessed: r.includes(t.key) };
            }),
            this.receiver._subscribe('ping', async (e, t) => ['keyChanged']);
        }
        async initializeSender() {
          var e, t, r;
          (this.activeServiceWorker = await (async function () {
            if (
              null === navigator ||
              void 0 === navigator ||
              !navigator.serviceWorker
            )
              return null;
            try {
              return (await navigator.serviceWorker.ready).active;
            } catch (e) {
              return null;
            }
          })()),
            this.activeServiceWorker &&
              ((this.sender = new Yt(this.activeServiceWorker)),
              (r = await this.sender._send('ping', {}, 800)) &&
                null !== (e = r[0]) &&
                void 0 !== e &&
                e.fulfilled &&
                null !== (t = r[0]) &&
                void 0 !== t &&
                t.value.includes('keyChanged') &&
                (this.serviceWorkerReceiverAvailable = !0));
        }
        async notifyServiceWorker(e) {
          var t;
          if (
            this.sender &&
            this.activeServiceWorker &&
            ((null ===
              (t =
                null === navigator || void 0 === navigator
                  ? void 0
                  : navigator.serviceWorker) || void 0 === t
              ? void 0
              : t.controller) || null) === this.activeServiceWorker
          )
            try {
              await this.sender._send(
                'keyChanged',
                { key: e },
                this.serviceWorkerReceiverAvailable ? 800 : 50,
              );
            } catch (e) {}
        }
        async _isAvailable() {
          try {
            if (!indexedDB) return !1;
            var e = await ir();
            return await sr(e, Ht, '1'), await ar(e, Ht), !0;
          } catch (e) {}
          return !1;
        }
        async _withPendingWrite(e) {
          this.pendingWrites++;
          try {
            await e();
          } finally {
            this.pendingWrites--;
          }
        }
        async _set(t, r) {
          return this._withPendingWrite(
            async () => (
              await this._withRetries((e) => sr(e, t, r)),
              (this.localCache[t] = r),
              this.notifyServiceWorker(t)
            ),
          );
        }
        async _get(t) {
          var e = await this._withRetries((e) =>
            (async function (e, t) {
              var r = nr(e, !1).get(t);
              return void 0 === (r = await new rr(r).toPromise())
                ? null
                : r.value;
            })(e, t),
          );
          return (this.localCache[t] = e);
        }
        async _remove(t) {
          return this._withPendingWrite(
            async () => (
              await this._withRetries((e) => ar(e, t)),
              delete this.localCache[t],
              this.notifyServiceWorker(t)
            ),
          );
        }
        async _poll() {
          var e,
            t,
            r = await this._withRetries((e) => {
              var t = nr(e, !1).getAll();
              return new rr(t).toPromise();
            });
          if (!r) return [];
          if (0 !== this.pendingWrites) return [];
          const n = [],
            i = new Set();
          for ({ fbase_key: e, value: t } of r)
            i.add(e),
              JSON.stringify(this.localCache[e]) !== JSON.stringify(t) &&
                (this.notifyListeners(e, t), n.push(e));
          for (const s of Object.keys(this.localCache))
            this.localCache[s] &&
              !i.has(s) &&
              (this.notifyListeners(s, null), n.push(s));
          return n;
        }
        notifyListeners(e, t) {
          this.localCache[e] = t;
          var r = this.listeners[e];
          if (r) for (const n of Array.from(r)) n(t);
        }
        startPolling() {
          this.stopPolling(),
            (this.pollTimer = setInterval(async () => this._poll(), 800));
        }
        stopPolling() {
          this.pollTimer &&
            (clearInterval(this.pollTimer), (this.pollTimer = null));
        }
        _addListener(e, t) {
          0 === Object.keys(this.listeners).length && this.startPolling(),
            this.listeners[e] ||
              ((this.listeners[e] = new Set()), this._get(e)),
            this.listeners[e].add(t);
        }
        _removeListener(e, t) {
          this.listeners[e] &&
            (this.listeners[e].delete(t),
            0 === this.listeners[e].size && delete this.listeners[e]),
            0 === Object.keys(this.listeners).length && this.stopPolling();
        }
      }
      or.type = 'LOCAL';
      const cr = or;
      function lr(i) {
        return new Promise((e, r) => {
          const t = document.createElement('script');
          var n;
          t.setAttribute('src', i),
            (t.onload = e),
            (t.onerror = (e) => {
              const t = U('internal-error');
              (t.customData = e), r(t);
            }),
            (t.type = 'text/javascript'),
            (t.charset = 'UTF-8'),
            (null !==
              (n =
                null === (n = document.getElementsByTagName('head')) ||
                void 0 === n
                  ? void 0
                  : n[0]) && void 0 !== n
              ? n
              : document
            ).appendChild(t);
        });
      }
      function ur(e) {
        return `__${e}${Math.floor(1e6 * Math.random())}`;
      }
      class dr {
        constructor(e) {
          (this.auth = e), (this.counter = 1e12), (this._widgets = new Map());
        }
        render(e, t) {
          var r = this.counter;
          return (
            this._widgets.set(r, new hr(e, this.auth.name, t || {})),
            this.counter++,
            r
          );
        }
        reset(e) {
          var t,
            r = e || 1e12;
          null === (t = this._widgets.get(r)) || void 0 === t || t.delete(),
            this._widgets.delete(r);
        }
        getResponse(e) {
          var t;
          return (
            (null === (t = this._widgets.get(e || 1e12)) || void 0 === t
              ? void 0
              : t.getResponse()) || ''
          );
        }
        async execute(e) {
          var t;
          return (
            null === (t = this._widgets.get(e || 1e12)) ||
              void 0 === t ||
              t.execute(),
            ''
          );
        }
      }
      class hr {
        constructor(e, t, r) {
          (this.params = r),
            (this.timerId = null),
            (this.deleted = !1),
            (this.responseToken = null),
            (this.clickHandler = () => {
              this.execute();
            });
          var n = 'string' == typeof e ? document.getElementById(e) : e;
          j(n, 'argument-error', { appName: t }),
            (this.container = n),
            (this.isVisible = 'invisible' !== this.params.size),
            this.isVisible
              ? this.execute()
              : this.container.addEventListener('click', this.clickHandler);
        }
        getResponse() {
          return this.checkIfDeleted(), this.responseToken;
        }
        delete() {
          this.checkIfDeleted(),
            (this.deleted = !0),
            this.timerId && (clearTimeout(this.timerId), (this.timerId = null)),
            this.container.removeEventListener('click', this.clickHandler);
        }
        execute() {
          this.checkIfDeleted(),
            this.timerId ||
              (this.timerId = window.setTimeout(() => {
                this.responseToken = (function (e) {
                  const t = [],
                    r =
                      '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                  for (let n = 0; n < e; n++)
                    t.push(r.charAt(Math.floor(Math.random() * r.length)));
                  return t.join('');
                })(50);
                const { callback: e, 'expired-callback': t } = this.params;
                if (e)
                  try {
                    e(this.responseToken);
                  } catch (e) {}
                this.timerId = window.setTimeout(() => {
                  if (((this.timerId = null), (this.responseToken = null), t))
                    try {
                      t();
                    } catch (e) {}
                  this.isVisible && this.execute();
                }, 6e4);
              }, 500));
        }
        checkIfDeleted() {
          if (this.deleted)
            throw new Error('reCAPTCHA mock was already deleted!');
        }
      }
      const pr = ur('rcb'),
        fr = new $(3e4, 6e4);
      class mr {
        constructor() {
          (this.hostLanguage = ''),
            (this.counter = 0),
            (this.librarySeparatelyLoaded = !!Xt().grecaptcha);
        }
        load(s, a = '') {
          var e;
          return (
            j(
              (e = a).length <= 6 && /^\s*[a-zA-Z0-9\-]*\s*$/.test(e),
              s,
              'argument-error',
            ),
            this.shouldResolveImmediately(a)
              ? Promise.resolve(Xt().grecaptcha)
              : new Promise((t, r) => {
                  const i = Xt().setTimeout(() => {
                    r(U(s, 'network-request-failed'));
                  }, fr.get());
                  (Xt()[pr] = () => {
                    Xt().clearTimeout(i), delete Xt()[pr];
                    const e = Xt().grecaptcha;
                    if (e) {
                      const n = e.render;
                      (e.render = (e, t) => {
                        var r = n(e, t);
                        return this.counter++, r;
                      }),
                        (this.hostLanguage = a),
                        t(e);
                    } else r(U(s, 'internal-error'));
                  }),
                    lr(
                      `https://www.google.com/recaptcha/api.js??${m({
                        onload: pr,
                        render: 'explicit',
                        hl: a,
                      })}`,
                    ).catch(() => {
                      clearTimeout(i), r(U(s, 'internal-error'));
                    });
                })
          );
        }
        clearedOneInstance() {
          this.counter--;
        }
        shouldResolveImmediately(e) {
          return (
            !!Xt().grecaptcha &&
            (e === this.hostLanguage ||
              0 < this.counter ||
              this.librarySeparatelyLoaded)
          );
        }
      }
      class vr {
        async load(e) {
          return new dr(e);
        }
        clearedOneInstance() {}
      }
      const gr = 'recaptcha',
        _r = { theme: 'light', type: 'image' };
      class yr {
        constructor(e, t = Object.assign({}, _r), r) {
          (this.parameters = t),
            (this.type = gr),
            (this.destroyed = !1),
            (this.widgetId = null),
            (this.tokenChangeListeners = new Set()),
            (this.renderPromise = null),
            (this.recaptcha = null),
            (this.auth = Le(r)),
            (this.isInvisible = 'invisible' === this.parameters.size),
            j(
              'undefined' != typeof document,
              this.auth,
              'operation-not-supported-in-this-environment',
            );
          var n = 'string' == typeof e ? document.getElementById(e) : e;
          j(n, this.auth, 'argument-error'),
            (this.container = n),
            (this.parameters.callback = this.makeTokenCallback(
              this.parameters.callback,
            )),
            (this._recaptchaLoader = new (
              this.auth.settings.appVerificationDisabledForTesting ? vr : mr
            )()),
            this.validateStartingState();
        }
        async verify() {
          this.assertNotDestroyed();
          const e = await this.render(),
            n = this.getAssertedRecaptcha();
          var t = n.getResponse(e);
          return (
            t ||
            new Promise((t) => {
              const r = (e) => {
                e && (this.tokenChangeListeners.delete(r), t(e));
              };
              this.tokenChangeListeners.add(r),
                this.isInvisible && n.execute(e);
            })
          );
        }
        render() {
          try {
            this.assertNotDestroyed();
          } catch (e) {
            return Promise.reject(e);
          }
          return (
            this.renderPromise ||
            ((this.renderPromise = this.makeRenderPromise().catch((e) => {
              throw ((this.renderPromise = null), e);
            })),
            this.renderPromise)
          );
        }
        _reset() {
          this.assertNotDestroyed(),
            null !== this.widgetId &&
              this.getAssertedRecaptcha().reset(this.widgetId);
        }
        clear() {
          this.assertNotDestroyed(),
            (this.destroyed = !0),
            this._recaptchaLoader.clearedOneInstance(),
            this.isInvisible ||
              this.container.childNodes.forEach((e) => {
                this.container.removeChild(e);
              });
        }
        validateStartingState() {
          j(!this.parameters.sitekey, this.auth, 'argument-error'),
            j(
              this.isInvisible || !this.container.hasChildNodes(),
              this.auth,
              'argument-error',
            ),
            j(
              'undefined' != typeof document,
              this.auth,
              'operation-not-supported-in-this-environment',
            );
        }
        makeTokenCallback(r) {
          return (t) => {
            if (
              (this.tokenChangeListeners.forEach((e) => e(t)),
              'function' == typeof r)
            )
              r(t);
            else if ('string' == typeof r) {
              const e = Xt()[r];
              'function' == typeof e && e(t);
            }
          };
        }
        assertNotDestroyed() {
          j(!this.destroyed, this.auth, 'internal-error');
        }
        async makeRenderPromise() {
          if ((await this.init(), !this.widgetId)) {
            let e = this.container;
            var t;
            this.isInvisible ||
              ((t = document.createElement('div')), e.appendChild(t), (e = t)),
              (this.widgetId = this.getAssertedRecaptcha().render(
                e,
                this.parameters,
              ));
          }
          return this.widgetId;
        }
        async init() {
          j(G() && !Zt(), this.auth, 'internal-error'),
            await (function () {
              let t = null;
              return new Promise((e) => {
                'complete' !== document.readyState
                  ? ((t = () => e()), window.addEventListener('load', t))
                  : e();
              }).catch((e) => {
                throw (t && window.removeEventListener('load', t), e);
              });
            })(),
            (this.recaptcha = await this._recaptchaLoader.load(
              this.auth,
              this.auth.languageCode || void 0,
            ));
          var e = await ((
            await ee(this.auth, 'GET', '/v1/recaptchaParams')
          ).recaptchaSiteKey || '');
          j(e, this.auth, 'internal-error'), (this.parameters.sitekey = e);
        }
        getAssertedRecaptcha() {
          return j(this.recaptcha, this.auth, 'internal-error'), this.recaptcha;
        }
      }
      class Ir {
        constructor(e, t) {
          (this.verificationId = e), (this.onConfirmation = t);
        }
        confirm(e) {
          var t = Ge._fromVerification(this.verificationId, e);
          return this.onConfirmation(t);
        }
      }
      async function wr(t, r, n) {
        var i,
          s,
          a,
          o,
          c,
          l,
          u = await n.verify();
        try {
          j('string' == typeof u, t, 'argument-error'),
            j(n.type === gr, t, 'argument-error');
          let e;
          if (
            ((e = 'string' == typeof r ? { phoneNumber: r } : r),
            'session' in e)
          ) {
            var d = e.session;
            if ('phoneNumber' in e)
              return (
                j('enroll' === d.type, t, 'internal-error'),
                ((c = t),
                (l = {
                  idToken: d.credential,
                  phoneEnrollmentInfo: {
                    phoneNumber: e.phoneNumber,
                    recaptchaToken: u,
                  },
                }),
                await ee(
                  c,
                  'POST',
                  '/v2/accounts/mfaEnrollment:start',
                  Q(c, l),
                )).phoneSessionInfo.sessionInfo
              );
            j('signin' === d.type, t, 'internal-error');
            var h =
              (null === (i = e.multiFactorHint) || void 0 === i
                ? void 0
                : i.uid) || e.multiFactorUid;
            return (
              j(h, t, 'missing-multi-factor-info'),
              ((o = {
                mfaPendingCredential: d.credential,
                mfaEnrollmentId: h,
                phoneSignInInfo: { recaptchaToken: u },
              }),
              await ee(t, 'POST', '/v2/accounts/mfaSignIn:start', Q(t, o)))
                .phoneResponseInfo.sessionInfo
            );
          }
          var p = ((s = t),
          (a = { phoneNumber: e.phoneNumber, recaptchaToken: u }),
          await ee(s, 'POST', '/v1/accounts:sendVerificationCode', Q(s, a)))[
            'sessionInfo'
          ];
          return p;
        } finally {
          n._reset();
        }
      }
      class Tr {
        constructor(e) {
          (this.providerId = Tr.PROVIDER_ID), (this.auth = Le(e));
        }
        verifyPhoneNumber(e, t) {
          return wr(this.auth, e, I(t));
        }
        static credential(e, t) {
          return Ge._fromVerification(e, t);
        }
        static credentialFromResult(e) {
          var t = e;
          return Tr.credentialFromTaggedObject(t);
        }
        static credentialFromError(e) {
          return Tr.credentialFromTaggedObject(e.customData || {});
        }
        static credentialFromTaggedObject({ _tokenResponse: e }) {
          if (!e) return null;
          var { phoneNumber: t, temporaryProof: r } = e;
          return t && r ? Ge._fromTokenResponse(t, r) : null;
        }
      }
      function br(e, t) {
        return t
          ? z(t)
          : (j(e._popupRedirectResolver, e, 'argument-error'),
            e._popupRedirectResolver);
      }
      (Tr.PROVIDER_ID = 'phone'), (Tr.PHONE_SIGN_IN_METHOD = 'phone');
      class kr extends xe {
        constructor(e) {
          super('custom', 'custom'), (this.params = e);
        }
        _getIdTokenResponse(e) {
          return qe(e, this._buildIdpRequest());
        }
        _linkToIdToken(e, t) {
          return qe(e, this._buildIdpRequest(t));
        }
        _getReauthenticationResolver(e) {
          return qe(e, this._buildIdpRequest());
        }
        _buildIdpRequest(e) {
          const t = {
            requestUri: this.params.requestUri,
            sessionId: this.params.sessionId,
            postBody: this.params.postBody,
            tenantId: this.params.tenantId,
            pendingToken: this.params.pendingToken,
            returnSecureToken: !0,
            returnIdpCredential: !0,
          };
          return e && (t.idToken = e), t;
        }
      }
      function Er(e) {
        return ft(e.auth, new kr(e), e.bypassAuthState);
      }
      function Rr(e) {
        var { auth: t, user: r } = e;
        return j(r, t, 'internal-error'), pt(r, new kr(e), e.bypassAuthState);
      }
      async function Sr(e) {
        var { auth: t, user: r } = e;
        return j(r, t, 'internal-error'), dt(r, new kr(e), e.bypassAuthState);
      }
      class Ar {
        constructor(e, t, r, n, i = !1) {
          (this.auth = e),
            (this.resolver = r),
            (this.user = n),
            (this.bypassAuthState = i),
            (this.pendingPromise = null),
            (this.eventManager = null),
            (this.filter = Array.isArray(t) ? t : [t]);
        }
        execute() {
          return new Promise(async (e, t) => {
            this.pendingPromise = { resolve: e, reject: t };
            try {
              (this.eventManager = await this.resolver._initialize(this.auth)),
                await this.onExecution(),
                this.eventManager.registerConsumer(this);
            } catch (e) {
              this.reject(e);
            }
          });
        }
        async onAuthEvent(e) {
          var {
            urlResponse: t,
            sessionId: r,
            postBody: n,
            tenantId: i,
            error: s,
            type: a,
          } = e;
          if (s) this.reject(s);
          else {
            n = {
              auth: this.auth,
              requestUri: t,
              sessionId: r,
              tenantId: i || void 0,
              postBody: n || void 0,
              user: this.user,
              bypassAuthState: this.bypassAuthState,
            };
            try {
              this.resolve(await this.getIdpTask(a)(n));
            } catch (e) {
              this.reject(e);
            }
          }
        }
        onError(e) {
          this.reject(e);
        }
        getIdpTask(e) {
          switch (e) {
            case 'signInViaPopup':
            case 'signInViaRedirect':
              return Er;
            case 'linkViaPopup':
            case 'linkViaRedirect':
              return Sr;
            case 'reauthViaPopup':
            case 'reauthViaRedirect':
              return Rr;
            default:
              M(this.auth, 'internal-error');
          }
        }
        resolve(e) {
          H(this.pendingPromise, 'Pending promise was never set'),
            this.pendingPromise.resolve(e),
            this.unregisterAndCleanUp();
        }
        reject(e) {
          H(this.pendingPromise, 'Pending promise was never set'),
            this.pendingPromise.reject(e),
            this.unregisterAndCleanUp();
        }
        unregisterAndCleanUp() {
          this.eventManager && this.eventManager.unregisterConsumer(this),
            (this.pendingPromise = null),
            this.cleanUp();
        }
      }
      const Or = new $(2e3, 1e4);
      class Nr extends Ar {
        constructor(e, t, r, n, i) {
          super(e, t, n, i),
            (this.provider = r),
            (this.authWindow = null),
            (this.pollId = null),
            Nr.currentPopupAction && Nr.currentPopupAction.cancel(),
            (Nr.currentPopupAction = this);
        }
        async executeNotNull() {
          var e = await this.execute();
          return j(e, this.auth, 'internal-error'), e;
        }
        async onExecution() {
          H(1 === this.filter.length, 'Popup operations only handle one event');
          var e = Jt();
          (this.authWindow = await this.resolver._openPopup(
            this.auth,
            this.provider,
            this.filter[0],
            e,
          )),
            (this.authWindow.associatedEvent = e),
            this.resolver._originValidation(this.auth).catch((e) => {
              this.reject(e);
            }),
            this.resolver._isIframeWebStorageSupported(this.auth, (e) => {
              e || this.reject(U(this.auth, 'web-storage-unsupported'));
            }),
            this.pollUserCancellation();
        }
        get eventId() {
          var e;
          return (
            (null === (e = this.authWindow) || void 0 === e
              ? void 0
              : e.associatedEvent) || null
          );
        }
        cancel() {
          this.reject(U(this.auth, 'cancelled-popup-request'));
        }
        cleanUp() {
          this.authWindow && this.authWindow.close(),
            this.pollId && window.clearTimeout(this.pollId),
            (this.authWindow = null),
            (this.pollId = null),
            (Nr.currentPopupAction = null);
        }
        pollUserCancellation() {
          const t = () => {
            var e;
            null !==
              (e =
                null === (e = this.authWindow) || void 0 === e
                  ? void 0
                  : e.window) &&
            void 0 !== e &&
            e.closed
              ? (this.pollId = window.setTimeout(() => {
                  (this.pollId = null),
                    this.reject(U(this.auth, 'popup-closed-by-user'));
                }, 2e3))
              : (this.pollId = window.setTimeout(t, Or.get()));
          };
          t();
        }
      }
      Nr.currentPopupAction = null;
      const Pr = 'pendingRedirect',
        Cr = new Map();
      class Lr extends Ar {
        constructor(e, t, r = !1) {
          super(
            e,
            [
              'signInViaRedirect',
              'linkViaRedirect',
              'reauthViaRedirect',
              'unknown',
            ],
            t,
            void 0,
            r,
          ),
            (this.eventId = null);
        }
        async execute() {
          let t = Cr.get(this.auth._key());
          if (!t) {
            try {
              const e = (await (async function (e, t) {
                const r = Fr(t),
                  n = Ur(e);
                if (!(await n._isAvailable())) return !1;
                var i = 'true' === (await n._get(r));
                return await n._remove(r), i;
              })(this.resolver, this.auth))
                ? await super.execute()
                : null;
              t = () => Promise.resolve(e);
            } catch (e) {
              t = () => Promise.reject(e);
            }
            Cr.set(this.auth._key(), t);
          }
          return (
            this.bypassAuthState ||
              Cr.set(this.auth._key(), () => Promise.resolve(null)),
            t()
          );
        }
        async onAuthEvent(e) {
          if ('signInViaRedirect' === e.type) return super.onAuthEvent(e);
          if ('unknown' !== e.type) {
            if (e.eventId) {
              var t = await this.auth._redirectUserForId(e.eventId);
              if (t) return (this.user = t), super.onAuthEvent(e);
              this.resolve(null);
            }
          } else this.resolve(null);
        }
        async onExecution() {}
        cleanUp() {}
      }
      async function Dr(e, t) {
        return Ur(e)._set(Fr(t), 'true');
      }
      function Mr(e, t) {
        Cr.set(e._key(), t);
      }
      function Ur(e) {
        return z(e._redirectPersistence);
      }
      function Fr(e) {
        return _e(Pr, e.config.apiKey, e.name);
      }
      function xr(e, t, r) {
        return (async function (e, t, r) {
          var n = Le(e);
          x(e, t, Je);
          const i = br(n, r);
          return await Dr(i, n), i._openRedirect(n, t, 'signInViaRedirect');
        })(e, t, r);
      }
      function Vr(e, t, r) {
        return (async function (e, t, r) {
          var n = I(e);
          x(n.auth, t, Je);
          const i = br(n.auth, r);
          await Dr(i, n.auth);
          var s = await Hr(n);
          return i._openRedirect(n.auth, t, 'reauthViaRedirect', s);
        })(e, t, r);
      }
      function jr(e, t, r) {
        return (async function (e, t, r) {
          var n = I(e);
          x(n.auth, t, Je);
          const i = br(n.auth, r);
          await ht(!1, n, t.providerId), await Dr(i, n.auth);
          var s = await Hr(n);
          return i._openRedirect(n.auth, t, 'linkViaRedirect', s);
        })(e, t, r);
      }
      async function Wr(e, t, r = !1) {
        const n = Le(e);
        var i = br(n, t);
        const s = new Lr(n, i, r),
          a = await s.execute();
        return (
          a &&
            !r &&
            (delete a.user._redirectEventId,
            await n._persistUserIfCurrent(a.user),
            await n._setRedirectUser(null, t)),
          a
        );
      }
      async function Hr(e) {
        var t = Jt(`${e.uid}:::`);
        return (
          (e._redirectEventId = t),
          await e.auth._setRedirectUser(e),
          await e.auth._persistUserIfCurrent(e),
          t
        );
      }
      class qr {
        constructor(e) {
          (this.auth = e),
            (this.cachedEventUids = new Set()),
            (this.consumers = new Set()),
            (this.queuedRedirectEvent = null),
            (this.hasHandledPotentialRedirect = !1),
            (this.lastProcessedEventTime = Date.now());
        }
        registerConsumer(e) {
          this.consumers.add(e),
            this.queuedRedirectEvent &&
              this.isEventForConsumer(this.queuedRedirectEvent, e) &&
              (this.sendToConsumer(this.queuedRedirectEvent, e),
              this.saveEventToCache(this.queuedRedirectEvent),
              (this.queuedRedirectEvent = null));
        }
        unregisterConsumer(e) {
          this.consumers.delete(e);
        }
        onEvent(t) {
          if (this.hasEventBeenHandled(t)) return !1;
          let r = !1;
          return (
            this.consumers.forEach((e) => {
              this.isEventForConsumer(t, e) &&
                ((r = !0), this.sendToConsumer(t, e), this.saveEventToCache(t));
            }),
            this.hasHandledPotentialRedirect ||
              !(function (e) {
                switch (e.type) {
                  case 'signInViaRedirect':
                  case 'linkViaRedirect':
                  case 'reauthViaRedirect':
                    return !0;
                  case 'unknown':
                    return Br(e);
                  default:
                    return !1;
                }
              })(t) ||
              ((this.hasHandledPotentialRedirect = !0),
              r || ((this.queuedRedirectEvent = t), (r = !0))),
            r
          );
        }
        sendToConsumer(e, t) {
          var r;
          e.error && !Br(e)
            ? ((r =
                (null === (r = e.error.code) || void 0 === r
                  ? void 0
                  : r.split('auth/')[1]) || 'internal-error'),
              t.onError(U(this.auth, r)))
            : t.onAuthEvent(e);
        }
        isEventForConsumer(e, t) {
          var r =
            null === t.eventId || (!!e.eventId && e.eventId === t.eventId);
          return t.filter.includes(e.type) && r;
        }
        hasEventBeenHandled(e) {
          return (
            6e5 <= Date.now() - this.lastProcessedEventTime &&
              this.cachedEventUids.clear(),
            this.cachedEventUids.has(zr(e))
          );
        }
        saveEventToCache(e) {
          this.cachedEventUids.add(zr(e)),
            (this.lastProcessedEventTime = Date.now());
        }
      }
      function zr(e) {
        return [e.type, e.eventId, e.sessionId, e.tenantId]
          .filter((e) => e)
          .join('-');
      }
      function Br({ type: e, error: t }) {
        return (
          'unknown' === e &&
          'auth/no-auth-event' === (null == t ? void 0 : t.code)
        );
      }
      async function Gr(e, t = {}) {
        return ee(e, 'GET', '/v1/projects', t);
      }
      const Kr = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
        $r = /^https?/;
      async function Jr(e) {
        if (!e.config.emulator) {
          var t = (await Gr(e))['authorizedDomains'];
          for (const r of t)
            try {
              if (
                (function (e) {
                  const t = B(),
                    { protocol: r, hostname: n } = new URL(t);
                  if (e.startsWith('chrome-extension://')) {
                    var i = new URL(e);
                    return '' === i.hostname && '' === n
                      ? 'chrome-extension:' === r &&
                          e.replace('chrome-extension://', '') ===
                            t.replace('chrome-extension://', '')
                      : 'chrome-extension:' === r && i.hostname === n;
                  }
                  if (!$r.test(r)) return !1;
                  if (Kr.test(e)) return n === e;
                  const s = e.replace(/\./g, '\\.'),
                    a = new RegExp('^(.+\\.' + s + '|' + s + ')$', 'i');
                  return a.test(n);
                })(r)
              )
                return;
            } catch (e) {}
          M(e, 'unauthorized-domain');
        }
      }
      const Yr = new $(3e4, 6e4);
      function Xr() {
        const t = Xt().___jsl;
        if (null !== t && void 0 !== t && t.H)
          for (const r of Object.keys(t.H))
            if (
              ((t.H[r].r = t.H[r].r || []),
              (t.H[r].L = t.H[r].L || []),
              (t.H[r].r = [...t.H[r].L]),
              t.CP)
            )
              for (let e = 0; e < t.CP.length; e++) t.CP[e] = null;
      }
      let Zr = null;
      function Qr(e) {
        var i;
        return (
          (Zr =
            Zr ||
            ((i = e),
            new Promise((e, t) => {
              function r() {
                Xr(),
                  gapi.load('gapi.iframes', {
                    callback: () => {
                      e(gapi.iframes.getContext());
                    },
                    ontimeout: () => {
                      Xr(), t(U(i, 'network-request-failed'));
                    },
                    timeout: Yr.get(),
                  });
              }
              if (
                null !==
                  (n =
                    null === (n = Xt().gapi) || void 0 === n
                      ? void 0
                      : n.iframes) &&
                void 0 !== n &&
                n.Iframe
              )
                e(gapi.iframes.getContext());
              else {
                if (null === (n = Xt().gapi) || void 0 === n || !n.load) {
                  var n = ur('iframefcb');
                  return (
                    (Xt()[n] = () => {
                      gapi.load ? r() : t(U(i, 'network-request-failed'));
                    }),
                    lr(`https://apis.google.com/js/api.js?onload=${n}`).catch(
                      (e) => t(e),
                    )
                  );
                }
                r();
              }
            }).catch((e) => {
              throw ((Zr = null), e);
            }))),
          Zr
        );
      }
      const en = new $(5e3, 15e3),
        tn = '__/auth/iframe',
        rn = 'emulator/auth/iframe',
        nn = {
          style: {
            position: 'absolute',
            top: '-100px',
            width: '1px',
            height: '1px',
          },
          'aria-hidden': 'true',
          tabindex: '-1',
        },
        sn = new Map([
          ['identitytoolkit.googleapis.com', 'p'],
          ['staging-identitytoolkit.sandbox.googleapis.com', 's'],
          ['test-identitytoolkit.sandbox.googleapis.com', 't'],
        ]);
      async function an(a) {
        const e = await Qr(a);
        var t = Xt().gapi;
        return (
          j(t, a, 'internal-error'),
          e.open(
            {
              where: document.body,
              url: (function (e) {
                var t = e.config;
                j(t.authDomain, e, 'auth-domain-config-required');
                var r = t.emulator
                  ? J(t, rn)
                  : `https://${e.config.authDomain}/${tn}`;
                const n = {
                  apiKey: t.apiKey,
                  appName: e.name,
                  v: ci.SDK_VERSION,
                };
                (t = sn.get(e.config.apiHost)) && (n.eid = t);
                const i = e._getFrameworks();
                return (
                  i.length && (n.fw = i.join(',')), `${r}?${m(n).slice(1)}`
                );
              })(a),
              messageHandlersFilter: t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,
              attributes: nn,
              dontclear: !0,
            },
            (s) =>
              new Promise(async (e, t) => {
                await s.restyle({ setHideOnLeave: !1 });
                const r = U(a, 'network-request-failed'),
                  n = Xt().setTimeout(() => {
                    t(r);
                  }, en.get());
                function i() {
                  Xt().clearTimeout(n), e(s);
                }
                s.ping(i).then(i, () => {
                  t(r);
                });
              }),
          )
        );
      }
      const on = {
        location: 'yes',
        resizable: 'yes',
        statusbar: 'yes',
        toolbar: 'no',
      };
      class cn {
        constructor(e) {
          (this.window = e), (this.associatedEvent = null);
        }
        close() {
          if (this.window)
            try {
              this.window.close();
            } catch (e) {}
        }
      }
      function ln(e, t, r, n = 500, i = 600) {
        var s = Math.max((window.screen.availHeight - i) / 2, 0).toString(),
          a = Math.max((window.screen.availWidth - n) / 2, 0).toString();
        let o = '';
        const c = Object.assign(Object.assign({}, on), {
          width: n.toString(),
          height: i.toString(),
          top: s,
          left: a,
        });
        s = d().toLowerCase();
        r && (o = be(s) ? '_blank' : r),
          we(s) && ((t = t || 'http://localhost'), (c.scrollbars = 'yes'));
        var l,
          a = Object.entries(c).reduce((e, [t, r]) => `${e}${t}=${r},`, '');
        if (
          (([r = d()] = [s]),
          Ae(r) &&
            null !== (l = window.navigator) &&
            void 0 !== l &&
            l.standalone &&
            '_self' !== o)
        )
          return (
            (function (e, t) {
              const r = document.createElement('a');
              (r.href = e), (r.target = t);
              const n = document.createEvent('MouseEvent');
              n.initMouseEvent(
                'click',
                !0,
                !0,
                window,
                1,
                0,
                0,
                0,
                0,
                !1,
                !1,
                !1,
                !1,
                1,
                null,
              ),
                r.dispatchEvent(n);
            })(t || '', o),
            new cn(null)
          );
        const u = window.open(t || '', o, a);
        j(u, e, 'popup-blocked');
        try {
          u.focus();
        } catch (e) {}
        return new cn(u);
      }
      const un = '__/auth/handler',
        dn = 'emulator/auth/handler';
      function hn(e, t, r, n, i, s) {
        j(e.config.authDomain, e, 'auth-domain-config-required'),
          j(e.config.apiKey, e, 'invalid-api-key');
        const a = {
          apiKey: e.config.apiKey,
          appName: e.name,
          authType: r,
          redirectUrl: n,
          v: ci.SDK_VERSION,
          eventId: i,
        };
        if (t instanceof Je) {
          t.setDefaultLanguage(e.languageCode),
            (a.providerId = t.providerId || ''),
            (function (e) {
              for (const t in e)
                if (Object.prototype.hasOwnProperty.call(e, t)) return;
              return 1;
            })(t.getCustomParameters()) ||
              (a.customParameters = JSON.stringify(t.getCustomParameters()));
          for (var [o, c] of Object.entries(s || {})) a[o] = c;
        }
        if (t instanceof Ye) {
          const u = t.getScopes().filter((e) => '' !== e);
          0 < u.length && (a.scopes = u.join(','));
        }
        e.tenantId && (a.tid = e.tenantId);
        const l = a;
        for (const d of Object.keys(l)) void 0 === l[d] && delete l[d];
        return `${
          ((e = [e['config']][0]),
          e.emulator ? J(e, dn) : `https://${e.authDomain}/${un}`)
        }?${m(l).slice(1)}`;
      }
      const pn = 'webStorageSupport';
      const fn = class {
        constructor() {
          (this.eventManagers = {}),
            (this.iframes = {}),
            (this.originValidationPromises = {}),
            (this._redirectPersistence = Kt),
            (this._completeRedirectFn = Wr),
            (this._overrideRedirectResult = Mr);
        }
        async _openPopup(e, t, r, n) {
          var i;
          return (
            H(
              null === (i = this.eventManagers[e._key()]) || void 0 === i
                ? void 0
                : i.manager,
              '_initialize() not called before _openPopup()',
            ),
            ln(e, hn(e, t, r, B(), n), Jt())
          );
        }
        async _openRedirect(e, t, r, n) {
          return (
            await this._originValidation(e),
            (n = hn(e, t, r, B(), n)),
            (Xt().location.href = n),
            new Promise(() => {})
          );
        }
        _initialize(e) {
          const t = e._key();
          if (this.eventManagers[t]) {
            const { manager: n, promise: r } = this.eventManagers[t];
            return n
              ? Promise.resolve(n)
              : (H(r, 'If manager is not set, promise should be'), r);
          }
          const r = this.initAndGetManager(e);
          return (
            (this.eventManagers[t] = { promise: r }),
            r.catch(() => {
              delete this.eventManagers[t];
            }),
            r
          );
        }
        async initAndGetManager(t) {
          const e = await an(t),
            r = new qr(t);
          return (
            e.register(
              'authEvent',
              (e) => {
                return (
                  j(null == e ? void 0 : e.authEvent, t, 'invalid-auth-event'),
                  { status: r.onEvent(e.authEvent) ? 'ACK' : 'ERROR' }
                );
              },
              gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER,
            ),
            (this.eventManagers[t._key()] = { manager: r }),
            (this.iframes[t._key()] = e),
            r
          );
        }
        _isIframeWebStorageSupported(r, n) {
          const e = this.iframes[r._key()];
          e.send(
            pn,
            { type: pn },
            (e) => {
              var t =
                null === (t = null == e ? void 0 : e[0]) || void 0 === t
                  ? void 0
                  : t[pn];
              void 0 !== t && n(!!t), M(r, 'internal-error');
            },
            gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER,
          );
        }
        _originValidation(e) {
          var t = e._key();
          return (
            this.originValidationPromises[t] ||
              (this.originValidationPromises[t] = Jr(e)),
            this.originValidationPromises[t]
          );
        }
        get _shouldInitProactively() {
          return Oe() || Te() || Ae();
        }
      };
      class mn extends class {
        constructor(e) {
          this.factorId = e;
        }
        _process(e, t, r) {
          switch (t.type) {
            case 'enroll':
              return this._finalizeEnroll(e, t.credential, r);
            case 'signin':
              return this._finalizeSignIn(e, t.credential);
            default:
              return W('unexpected MultiFactorSessionType');
          }
        }
      } {
        constructor(e) {
          super('phone'), (this.credential = e);
        }
        static _fromCredential(e) {
          return new mn(e);
        }
        _finalizeEnroll(e, t, r) {
          return (
            (e = e),
            (r = {
              idToken: t,
              displayName: r,
              phoneVerificationInfo: this.credential._makeVerificationRequest(),
            }),
            ee(e, 'POST', '/v2/accounts/mfaEnrollment:finalize', Q(e, r))
          );
        }
        _finalizeSignIn(e, t) {
          return (
            (e = e),
            (t = {
              mfaPendingCredential: t,
              phoneVerificationInfo: this.credential._makeVerificationRequest(),
            }),
            ee(e, 'POST', '/v2/accounts/mfaSignIn:finalize', Q(e, t))
          );
        }
      }
      class vn {
        constructor() {}
        static assertion(e) {
          return mn._fromCredential(e);
        }
      }
      vn.FACTOR_ID = 'phone';
      var gn,
        _n = '@firebase/auth';
      class yn {
        constructor(e) {
          (this.auth = e), (this.internalListeners = new Map());
        }
        getUid() {
          var e;
          return (
            this.assertAuthConfigured(),
            (null === (e = this.auth.currentUser) || void 0 === e
              ? void 0
              : e.uid) || null
          );
        }
        async getToken(e) {
          return (
            this.assertAuthConfigured(),
            await this.auth._initializationPromise,
            this.auth.currentUser
              ? { accessToken: await this.auth.currentUser.getIdToken(e) }
              : null
          );
        }
        addAuthTokenListener(t) {
          var e;
          this.assertAuthConfigured(),
            this.internalListeners.has(t) ||
              ((e = this.auth.onIdTokenChanged((e) => {
                t(
                  (null === e || void 0 === e
                    ? void 0
                    : e.stsTokenManager.accessToken) || null,
                );
              })),
              this.internalListeners.set(t, e),
              this.updateProactiveRefresh());
        }
        removeAuthTokenListener(e) {
          this.assertAuthConfigured();
          const t = this.internalListeners.get(e);
          t &&
            (this.internalListeners.delete(e),
            t(),
            this.updateProactiveRefresh());
        }
        assertAuthConfigured() {
          j(
            this.auth._initializationPromise,
            'dependent-sdk-initialized-before-auth',
          );
        }
        updateProactiveRefresh() {
          0 < this.internalListeners.size
            ? this.auth._startProactiveRefresh()
            : this.auth._stopProactiveRefresh();
        }
      }
      function In() {
        return window;
      }
      (gn = 'Browser'),
        ci._registerComponent(
          new R(
            'auth',
            (e, { options: n }) => {
              var t = e.getProvider('app').getImmediate(),
                r = e.getProvider('heartbeat');
              const { apiKey: i, authDomain: s } = t.options;
              return ((e, t) => {
                j(i && !i.includes(':'), 'invalid-api-key', {
                  appName: e.name,
                }),
                  j(
                    !(null !== s && void 0 !== s && s.includes(':')),
                    'argument-error',
                    { appName: e.name },
                  );
                var r = {
                    apiKey: i,
                    authDomain: s,
                    clientPlatform: gn,
                    apiHost: 'identitytoolkit.googleapis.com',
                    tokenApiHost: 'securetoken.googleapis.com',
                    apiScheme: 'https',
                    sdkClientVersion: Ne(gn),
                  },
                  r = new Ce(e, t, r);
                return (
                  (function (e, t) {
                    const r = (null == t ? void 0 : t.persistence) || [];
                    var n = (Array.isArray(r) ? r : [r]).map(z);
                    null != t && t.errorMap && e._updateErrorMap(t.errorMap),
                      e._initializeWithPersistence(
                        n,
                        null == t ? void 0 : t.popupRedirectResolver,
                      );
                  })(r, n),
                  r
                );
              })(t, r);
            },
            'PUBLIC',
          )
            .setInstantiationMode('EXPLICIT')
            .setInstanceCreatedCallback((e, t, r) => {
              const n = e.getProvider('auth-internal');
              n.initialize();
            }),
        ),
        ci._registerComponent(
          new R(
            'auth-internal',
            (e) => {
              var t = Le(e.getProvider('auth').getImmediate());
              return (e = t), new yn(e);
            },
            'PRIVATE',
          ).setInstantiationMode('EXPLICIT'),
        ),
        ci.registerVersion(
          _n,
          '0.20.2',
          (function (e) {
            switch (e) {
              case 'Node':
                return 'node';
              case 'ReactNative':
                return 'rn';
              case 'Worker':
                return 'webworker';
              case 'Cordova':
                return 'cordova';
              default:
                return;
            }
          })(gn),
        ),
        ci.registerVersion(_n, '0.20.2', 'esm2017');
      async function wn(e, t, r) {
        var n = In()['BuildInfo'];
        H(t.sessionId, 'AuthEvent did not contain a session ID');
        var i = await (async function (e) {
          const t = (function (e) {
              if (
                (H(
                  /[0-9a-zA-Z]+/.test(e),
                  'Can only convert alpha-numeric strings',
                ),
                'undefined' != typeof TextEncoder)
              )
                return new TextEncoder().encode(e);
              const t = new ArrayBuffer(e.length),
                r = new Uint8Array(t);
              for (let n = 0; n < e.length; n++) r[n] = e.charCodeAt(n);
              return r;
            })(e),
            r = await crypto.subtle.digest('SHA-256', t),
            n = Array.from(new Uint8Array(r));
          return n.map((e) => e.toString(16).padStart(2, '0')).join('');
        })(t.sessionId);
        const s = {};
        return (
          Ae()
            ? (s.ibi = n.packageName)
            : Ee()
            ? (s.apn = n.packageName)
            : M(e, 'operation-not-supported-in-this-environment'),
          n.displayName && (s.appDisplayName = n.displayName),
          (s.sessionId = i),
          hn(
            e,
            r,
            t.type,
            void 0,
            null !== (i = t.eventId) && void 0 !== i ? i : void 0,
            s,
          )
        );
      }
      function Tn(n) {
        const i = In()['cordova'];
        return new Promise((r) => {
          i.plugins.browsertab.isAvailable((e) => {
            let t = null;
            e
              ? i.plugins.browsertab.openUrl(n)
              : (t = i.InAppBrowser.open(
                  n,
                  ((e = d()),
                  /(iPad|iPhone|iPod).*OS 7_\d/i.test(e) ||
                  /(iPad|iPhone|iPod).*OS 8_\d/i.test(e)
                    ? '_blank'
                    : '_system'),
                  'location=yes',
                )),
              r(t);
          });
        });
      }
      const bn = 20;
      class kn extends qr {
        constructor() {
          super(...arguments),
            (this.passiveListeners = new Set()),
            (this.initPromise = new Promise((e) => {
              this.resolveInialized = e;
            }));
        }
        addPassiveListener(e) {
          this.passiveListeners.add(e);
        }
        removePassiveListener(e) {
          this.passiveListeners.delete(e);
        }
        resetRedirect() {
          (this.queuedRedirectEvent = null),
            (this.hasHandledPotentialRedirect = !1);
        }
        onEvent(t) {
          return (
            this.resolveInialized(),
            this.passiveListeners.forEach((e) => e(t)),
            super.onEvent(t)
          );
        }
        async initialized() {
          await this.initPromise;
        }
      }
      function En(e, t, r = null) {
        return {
          type: t,
          eventId: r,
          urlResponse: null,
          sessionId: (function () {
            const e = [],
              t =
                '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            for (let n = 0; n < bn; n++) {
              var r = Math.floor(Math.random() * t.length);
              e.push(t.charAt(r));
            }
            return e.join('');
          })(),
          postBody: null,
          tenantId: e.tenantId,
          error: U(e, 'no-auth-event'),
        };
      }
      async function Rn(e) {
        var t = await An()._get(On(e));
        return t && (await An()._remove(On(e))), t;
      }
      function Sn(e, t) {
        var r, n, i;
        const s =
          ((r = Nn((t = t))),
          (a = r.link ? decodeURIComponent(r.link) : void 0),
          (n = Nn(a).link),
          (i = r.deep_link_id ? decodeURIComponent(r.deep_link_id) : void 0),
          (r = Nn(i).link) || i || n || a || t);
        if (s.includes('/__/auth/callback')) {
          var a = Nn(s),
            a = a.firebaseError
              ? (function (e) {
                  try {
                    return JSON.parse(e);
                  } catch (e) {
                    return null;
                  }
                })(decodeURIComponent(a.firebaseError))
              : null,
            a =
              null ===
                (a =
                  null === (a = null == a ? void 0 : a.code) || void 0 === a
                    ? void 0
                    : a.split('auth/')) || void 0 === a
                ? void 0
                : a[1],
            a = a ? U(a) : null;
          return a
            ? {
                type: e.type,
                eventId: e.eventId,
                tenantId: e.tenantId,
                error: a,
                urlResponse: null,
                sessionId: null,
                postBody: null,
              }
            : {
                type: e.type,
                eventId: e.eventId,
                tenantId: e.tenantId,
                sessionId: e.sessionId,
                urlResponse: s,
                postBody: null,
              };
        }
        return null;
      }
      function An() {
        return z(Bt);
      }
      function On(e) {
        return _e('authEvent', e.config.apiKey, e.name);
      }
      function Nn(e) {
        if (null == e || !e.includes('?')) return {};
        const [, ...t] = e.split('?');
        return v(t.join('?'));
      }
      const Pn = class {
        constructor() {
          (this._redirectPersistence = Kt),
            (this._shouldInitProactively = !0),
            (this.eventManagers = new Map()),
            (this.originValidationPromises = {}),
            (this._completeRedirectFn = Wr),
            (this._overrideRedirectResult = Mr);
        }
        async _initialize(e) {
          var t = e._key();
          let r = this.eventManagers.get(t);
          return (
            r ||
              ((r = new kn(e)),
              this.eventManagers.set(t, r),
              this.attachCallbackListeners(e, r)),
            r
          );
        }
        _openPopup(e) {
          M(e, 'operation-not-supported-in-this-environment');
        }
        async _openRedirect(e, t, r, n) {
          var i, s;
          (i = e),
            (o = In()),
            j(
              'function' ==
                typeof (null === (s = null == o ? void 0 : o.universalLinks) ||
                void 0 === s
                  ? void 0
                  : s.subscribe),
              i,
              'invalid-cordova-configuration',
              { missingPlugin: 'cordova-universal-links-plugin-fix' },
            ),
            j(
              void 0 !==
                (null === (s = null == o ? void 0 : o.BuildInfo) || void 0 === s
                  ? void 0
                  : s.packageName),
              i,
              'invalid-cordova-configuration',
              { missingPlugin: 'cordova-plugin-buildInfo' },
            ),
            j(
              'function' ==
                typeof (null ===
                  (s =
                    null ===
                      (s =
                        null === (s = null == o ? void 0 : o.cordova) ||
                        void 0 === s
                          ? void 0
                          : s.plugins) || void 0 === s
                      ? void 0
                      : s.browsertab) || void 0 === s
                  ? void 0
                  : s.openUrl),
              i,
              'invalid-cordova-configuration',
              { missingPlugin: 'cordova-plugin-browsertab' },
            ),
            j(
              'function' ==
                typeof (null ===
                  (s =
                    null ===
                      (s =
                        null === (s = null == o ? void 0 : o.cordova) ||
                        void 0 === s
                          ? void 0
                          : s.plugins) || void 0 === s
                      ? void 0
                      : s.browsertab) || void 0 === s
                  ? void 0
                  : s.isAvailable),
              i,
              'invalid-cordova-configuration',
              { missingPlugin: 'cordova-plugin-browsertab' },
            ),
            j(
              'function' ==
                typeof (null ===
                  (o =
                    null === (o = null == o ? void 0 : o.cordova) ||
                    void 0 === o
                      ? void 0
                      : o.InAppBrowser) || void 0 === o
                  ? void 0
                  : o.open),
              i,
              'invalid-cordova-configuration',
              { missingPlugin: 'cordova-plugin-inappbrowser' },
            );
          const a = await this._initialize(e);
          await a.initialized(),
            a.resetRedirect(),
            Cr.clear(),
            await this._originValidation(e);
          var o = En(e, r, n);
          (r = e), (n = o), await An()._set(On(r), n);
          o = await Tn(await wn(e, o, t));
          return (async function (a, o, c) {
            const l = In()['cordova'];
            let u = () => {};
            try {
              await new Promise((r, e) => {
                let t = null;
                function n() {
                  var e;
                  r();
                  const t =
                    null === (e = l.plugins.browsertab) || void 0 === e
                      ? void 0
                      : e.close;
                  'function' == typeof t && t(),
                    'function' == typeof (null == c ? void 0 : c.close) &&
                      c.close();
                }
                function i() {
                  t =
                    t ||
                    window.setTimeout(() => {
                      e(U(a, 'redirect-cancelled-by-user'));
                    }, 2e3);
                }
                function s() {
                  'visible' ===
                    (null === document || void 0 === document
                      ? void 0
                      : document.visibilityState) && i();
                }
                o.addPassiveListener(n),
                  document.addEventListener('resume', i, !1),
                  Ee() && document.addEventListener('visibilitychange', s, !1),
                  (u = () => {
                    o.removePassiveListener(n),
                      document.removeEventListener('resume', i, !1),
                      document.removeEventListener('visibilitychange', s, !1),
                      t && window.clearTimeout(t);
                  });
              });
            } finally {
              u();
            }
          })(e, a, o);
        }
        _isIframeWebStorageSupported(e, t) {
          throw new Error('Method not implemented.');
        }
        _originValidation(e) {
          var t = e._key();
          return (
            this.originValidationPromises[t] ||
              (this.originValidationPromises[t] = (async function (e) {
                var t = In()['BuildInfo'];
                const r = {};
                Ae()
                  ? (r.iosBundleId = t.packageName)
                  : Ee()
                  ? (r.androidPackageName = t.packageName)
                  : M(e, 'operation-not-supported-in-this-environment'),
                  await Gr(e, r);
              })(e)),
            this.originValidationPromises[t]
          );
        }
        attachCallbackListeners(n, i) {
          const { universalLinks: e, handleOpenURL: t, BuildInfo: r } = In(),
            s = setTimeout(async () => {
              await Rn(n), i.onEvent(Cn());
            }, 500),
            a = async (e) => {
              clearTimeout(s);
              var t = await Rn(n);
              let r = null;
              t && null != e && e.url && (r = Sn(t, e.url)),
                i.onEvent(r || Cn());
            };
          void 0 !== e &&
            'function' == typeof e.subscribe &&
            e.subscribe(null, a);
          const o = t,
            c = `${r.packageName.toLowerCase()}://`;
          In().handleOpenURL = async (e) => {
            if (
              (e.toLowerCase().startsWith(c) && a({ url: e }),
              'function' == typeof o)
            )
              try {
                o(e);
              } catch (e) {
                console.error(e);
              }
          };
        }
      };
      function Cn() {
        return {
          type: 'unknown',
          eventId: null,
          sessionId: null,
          urlResponse: null,
          postBody: null,
          tenantId: null,
          error: U('no-auth-event'),
        };
      }
      var Ln;
      function Dn() {
        var e;
        return (
          (null ===
            (e = null === self || void 0 === self ? void 0 : self.location) ||
          void 0 === e
            ? void 0
            : e.protocol) || null
        );
      }
      function Mn(e = d()) {
        return !(
          ('file:' !== Dn() && 'ionic:' !== Dn() && 'capacitor:' !== Dn()) ||
          !e.toLowerCase().match(/iphone|ipad|ipod|android/)
        );
      }
      function Un(e = d()) {
        return (
          (l() &&
            11 ===
              (null === document || void 0 === document
                ? void 0
                : document.documentMode)) ||
          (([e = d()] = [e]), /Edge\/\d+/.test(e))
        );
      }
      function Fn() {
        try {
          const t = self.localStorage;
          var e = Jt();
          if (t) return t.setItem(e, '1'), t.removeItem(e), !Un() || u();
        } catch (e) {
          return xn() && u();
        }
        return !1;
      }
      function xn() {
        return (
          'undefined' != typeof global &&
          'WorkerGlobalScope' in global &&
          'importScripts' in global
        );
      }
      function Vn() {
        return (
          ('http:' === Dn() || 'https:' === Dn() || o() || Mn()) &&
          !(c() || a()) &&
          Fn() &&
          !xn()
        );
      }
      function jn() {
        return Mn() && 'undefined' != typeof document;
      }
      const Wn = { LOCAL: 'local', NONE: 'none', SESSION: 'session' },
        Hn = j,
        qn = 'persistence';
      async function zn(e) {
        await e._initializationPromise;
        const t = Bn();
        var r = _e(qn, e.config.apiKey, e.name);
        t && t.setItem(r, e._getPersistence());
      }
      function Bn() {
        var e;
        try {
          return (
            (null === (e = 'undefined' != typeof window ? window : null)
              ? void 0
              : e.sessionStorage) || null
          );
        } catch (e) {
          return null;
        }
      }
      const Gn = j;
      class Kn {
        constructor() {
          (this.browserResolver = z(fn)),
            (this.cordovaResolver = z(Pn)),
            (this.underlyingResolver = null),
            (this._redirectPersistence = Kt),
            (this._completeRedirectFn = Wr),
            (this._overrideRedirectResult = Mr);
        }
        async _initialize(e) {
          return (
            await this.selectUnderlyingResolver(),
            this.assertedUnderlyingResolver._initialize(e)
          );
        }
        async _openPopup(e, t, r, n) {
          return (
            await this.selectUnderlyingResolver(),
            this.assertedUnderlyingResolver._openPopup(e, t, r, n)
          );
        }
        async _openRedirect(e, t, r, n) {
          return (
            await this.selectUnderlyingResolver(),
            this.assertedUnderlyingResolver._openRedirect(e, t, r, n)
          );
        }
        _isIframeWebStorageSupported(e, t) {
          this.assertedUnderlyingResolver._isIframeWebStorageSupported(e, t);
        }
        _originValidation(e) {
          return this.assertedUnderlyingResolver._originValidation(e);
        }
        get _shouldInitProactively() {
          return jn() || this.browserResolver._shouldInitProactively;
        }
        get assertedUnderlyingResolver() {
          return (
            Gn(this.underlyingResolver, 'internal-error'),
            this.underlyingResolver
          );
        }
        async selectUnderlyingResolver() {
          var e;
          this.underlyingResolver ||
            ((e = await (!!jn() &&
              new Promise((e) => {
                const t = setTimeout(() => {
                  e(!1);
                }, 1e3);
                document.addEventListener('deviceready', () => {
                  clearTimeout(t), e(!0);
                });
              }))),
            (this.underlyingResolver = e
              ? this.cordovaResolver
              : this.browserResolver));
        }
      }
      function $n(e) {
        return e.unwrap();
      }
      function Jn(e, t) {
        var r,
          n,
          i,
          s =
            null === (n = t.customData) || void 0 === n
              ? void 0
              : n._tokenResponse;
        if ('auth/multi-factor-auth-required' === t.code) {
          const o = t;
          o.resolver = new Qn(
            e,
            ((r = t),
            (i = I(e)),
            j((a = r).customData.operationType, i, 'argument-error'),
            j(
              null === (n = a.customData._serverResponse) || void 0 === n
                ? void 0
                : n.mfaPendingCredential,
              i,
              'argument-error',
            ),
            Vt._fromError(i, a)),
          );
        } else if (s) {
          var a = Yn(t);
          const c = t;
          a &&
            ((c.credential = a),
            (c.tenantId = s.tenantId || void 0),
            (c.email = s.email || void 0),
            (c.phoneNumber = s.phoneNumber || void 0));
        }
      }
      function Yn(e) {
        var t = (e instanceof h ? e.customData : e)['_tokenResponse'];
        if (!t) return null;
        if (!(e instanceof h) && 'temporaryProof' in t && 'phoneNumber' in t)
          return Tr.credentialFromResult(e);
        const r = t.providerId;
        if (!r || r === S.PASSWORD) return null;
        let n;
        switch (r) {
          case S.GOOGLE:
            n = Qe;
            break;
          case S.FACEBOOK:
            n = Ze;
            break;
          case S.GITHUB:
            n = et;
            break;
          case S.TWITTER:
            n = nt;
            break;
          default:
            var {
              oauthIdToken: i,
              oauthAccessToken: s,
              oauthTokenSecret: a,
              pendingToken: o,
              nonce: c,
            } = t;
            return s || a || i || o
              ? o
                ? r.startsWith('saml.')
                  ? tt._create(r, o)
                  : ze._fromParams({
                      providerId: r,
                      signInMethod: r,
                      pendingToken: o,
                      idToken: i,
                      accessToken: s,
                    })
                : new Xe(r).credential({
                    idToken: i,
                    accessToken: s,
                    rawNonce: c,
                  })
              : null;
        }
        return e instanceof h
          ? n.credentialFromError(e)
          : n.credentialFromResult(e);
      }
      function Xn(t, e) {
        return e
          .catch((e) => {
            throw (e instanceof h && Jn(t, e), e);
          })
          .then((e) => {
            var t = e.operationType,
              r = e.user;
            return {
              operationType: t,
              credential: Yn(e),
              additionalUserInfo: Ft(e),
              user: ei.getOrCreate(r),
            };
          });
      }
      async function Zn(t, e) {
        const r = await e;
        return {
          verificationId: r.verificationId,
          confirm: (e) => Xn(t, r.confirm(e)),
        };
      }
      class Qn {
        constructor(e, t) {
          (this.resolver = t), (this.auth = e.wrapped());
        }
        get session() {
          return this.resolver.session;
        }
        get hints() {
          return this.resolver.hints;
        }
        resolveSignIn(e) {
          return Xn($n(this.auth), this.resolver.resolveSignIn(e));
        }
      }
      class ei {
        constructor(e) {
          var t;
          (this._delegate = e),
            (this.multiFactor =
              ((t = I(e)), Wt.has(t) || Wt.set(t, jt._fromUser(t)), Wt.get(t)));
        }
        static getOrCreate(e) {
          return (
            ei.USER_MAP.has(e) || ei.USER_MAP.set(e, new ei(e)),
            ei.USER_MAP.get(e)
          );
        }
        delete() {
          return this._delegate.delete();
        }
        reload() {
          return this._delegate.reload();
        }
        toJSON() {
          return this._delegate.toJSON();
        }
        getIdTokenResult(e) {
          return this._delegate.getIdTokenResult(e);
        }
        getIdToken(e) {
          return this._delegate.getIdToken(e);
        }
        linkAndRetrieveDataWithCredential(e) {
          return this.linkWithCredential(e);
        }
        async linkWithCredential(e) {
          return Xn(this.auth, vt(this._delegate, e));
        }
        async linkWithPhoneNumber(e, t) {
          return Zn(
            this.auth,
            (async function (e, t, r) {
              const n = I(e);
              await ht(!1, n, 'phone');
              var i = await wr(n.auth, t, I(r));
              return new Ir(i, (e) => vt(n, e));
            })(this._delegate, e, t),
          );
        }
        async linkWithPopup(e) {
          return Xn(
            this.auth,
            (async function (e, t, r) {
              var n = I(e);
              x(n.auth, t, Je);
              var i = br(n.auth, r);
              const s = new Nr(n.auth, 'linkViaPopup', t, i, n);
              return s.executeNotNull();
            })(this._delegate, e, Kn),
          );
        }
        async linkWithRedirect(e) {
          return await zn(Le(this.auth)), jr(this._delegate, e, Kn);
        }
        reauthenticateAndRetrieveDataWithCredential(e) {
          return this.reauthenticateWithCredential(e);
        }
        async reauthenticateWithCredential(e) {
          return Xn(this.auth, gt(this._delegate, e));
        }
        reauthenticateWithPhoneNumber(e, t) {
          return Zn(
            this.auth,
            (async function (e, t, r) {
              const n = I(e);
              var i = await wr(n.auth, t, I(r));
              return new Ir(i, (e) => gt(n, e));
            })(this._delegate, e, t),
          );
        }
        reauthenticateWithPopup(e) {
          return Xn(
            this.auth,
            (async function (e, t, r) {
              var n = I(e);
              x(n.auth, t, Je);
              var i = br(n.auth, r);
              const s = new Nr(n.auth, 'reauthViaPopup', t, i, n);
              return s.executeNotNull();
            })(this._delegate, e, Kn),
          );
        }
        async reauthenticateWithRedirect(e) {
          return await zn(Le(this.auth)), Vr(this._delegate, e, Kn);
        }
        sendEmailVerification(e) {
          return St(this._delegate, e);
        }
        async unlink(e) {
          return await ut(this._delegate, e), this;
        }
        updateEmail(e) {
          return Nt(I(this._delegate), e, null);
        }
        updatePassword(e) {
          return Nt(I(this._delegate), null, e);
        }
        updatePhoneNumber(e) {
          return (async function (e, t) {
            await dt(I(e), t);
          })(this._delegate, e);
        }
        updateProfile(e) {
          return Ot(this._delegate, e);
        }
        verifyBeforeUpdateEmail(e, t) {
          return At(this._delegate, e, t);
        }
        get emailVerified() {
          return this._delegate.emailVerified;
        }
        get isAnonymous() {
          return this._delegate.isAnonymous;
        }
        get metadata() {
          return this._delegate.metadata;
        }
        get phoneNumber() {
          return this._delegate.phoneNumber;
        }
        get providerData() {
          return this._delegate.providerData;
        }
        get refreshToken() {
          return this._delegate.refreshToken;
        }
        get tenantId() {
          return this._delegate.tenantId;
        }
        get displayName() {
          return this._delegate.displayName;
        }
        get email() {
          return this._delegate.email;
        }
        get photoURL() {
          return this._delegate.photoURL;
        }
        get providerId() {
          return this._delegate.providerId;
        }
        get uid() {
          return this._delegate.uid;
        }
        get auth() {
          return this._delegate.auth;
        }
      }
      ei.USER_MAP = new WeakMap();
      const ti = j;
      class ri {
        constructor(e, t) {
          if (((this.app = e), t.isInitialized()))
            return (
              (this._delegate = t.getImmediate()),
              void this.linkUnderlyingAuth()
            );
          var r = e.options['apiKey'];
          ti(r, 'invalid-api-key', { appName: e.name }),
            ti(r, 'invalid-api-key', { appName: e.name });
          var n = 'undefined' != typeof window ? Kn : void 0;
          (this._delegate = t.initialize({
            options: {
              persistence: (function (e, t) {
                const r = (function (e, t) {
                  const r = Bn();
                  if (!r) return [];
                  var n = _e(qn, e, t);
                  switch (r.getItem(n)) {
                    case Wn.NONE:
                      return [ge];
                    case Wn.LOCAL:
                      return [cr, Kt];
                    case Wn.SESSION:
                      return [Kt];
                    default:
                      return [];
                  }
                })(e, t);
                'undefined' == typeof self || r.includes(cr) || r.push(cr);
                if ('undefined' != typeof window)
                  for (const n of [Bt, Kt]) r.includes(n) || r.push(n);
                r.includes(ge) || r.push(ge);
                return r;
              })(r, e.name),
              popupRedirectResolver: n,
            },
          })),
            this._delegate._updateErrorMap(N),
            this.linkUnderlyingAuth();
        }
        get emulatorConfig() {
          return this._delegate.emulatorConfig;
        }
        get currentUser() {
          return this._delegate.currentUser
            ? ei.getOrCreate(this._delegate.currentUser)
            : null;
        }
        get languageCode() {
          return this._delegate.languageCode;
        }
        set languageCode(e) {
          this._delegate.languageCode = e;
        }
        get settings() {
          return this._delegate.settings;
        }
        get tenantId() {
          return this._delegate.tenantId;
        }
        set tenantId(e) {
          this._delegate.tenantId = e;
        }
        useDeviceLanguage() {
          this._delegate.useDeviceLanguage();
        }
        signOut() {
          return this._delegate.signOut();
        }
        useEmulator(e, t) {
          Me(this._delegate, e, t);
        }
        applyActionCode(e) {
          return bt(this._delegate, e);
        }
        checkActionCode(e) {
          return kt(this._delegate, e);
        }
        confirmPasswordReset(e, t) {
          return (async function (e, t, r) {
            await Ve(I(e), { oobCode: t, newPassword: r });
          })(this._delegate, e, t);
        }
        async createUserWithEmailAndPassword(e, t) {
          return Xn(
            this._delegate,
            (async function (e, t, r) {
              const n = Le(e);
              var i = await it(n, {
                  returnSecureToken: !0,
                  email: t,
                  password: r,
                }),
                i = await st._fromIdTokenResponse(n, 'signIn', i);
              return await n._updateCurrentUser(i.user), i;
            })(this._delegate, e, t),
          );
        }
        fetchProvidersForEmail(e) {
          return this.fetchSignInMethodsForEmail(e);
        }
        fetchSignInMethodsForEmail(e) {
          return Rt(this._delegate, e);
        }
        isSignInWithEmailLink(e) {
          return (
            this._delegate,
            (e = e),
            'EMAIL_SIGNIN' ===
              (null == (t = Ke.parseLink(e)) ? void 0 : t.operation)
          );
          var t;
        }
        async getRedirectResult() {
          ti(
            Vn(),
            this._delegate,
            'operation-not-supported-in-this-environment',
          );
          var e,
            t,
            r =
              ((e = this._delegate),
              (t = Kn),
              await Le(e)._initializationPromise,
              await Wr(e, t, !1));
          return r
            ? Xn(this._delegate, Promise.resolve(r))
            : { credential: null, user: null };
        }
        addFrameworkForLogging(e) {
          Le(this._delegate)._logFramework(e);
        }
        onAuthStateChanged(e, t, r) {
          var { next: n, error: i, complete: s } = ni(e, t, r);
          return this._delegate.onAuthStateChanged(n, i, s);
        }
        onIdTokenChanged(e, t, r) {
          var { next: n, error: i, complete: s } = ni(e, t, r);
          return this._delegate.onIdTokenChanged(n, i, s);
        }
        sendSignInLinkToEmail(e, t) {
          return Et(this._delegate, e, t);
        }
        sendPasswordResetEmail(e, t) {
          return Tt(this._delegate, e, t || void 0);
        }
        async setPersistence(e) {
          var t, r;
          (t = this._delegate),
            (r = e),
            Hn(Object.values(Wn).includes(r), t, 'invalid-persistence-type'),
            c()
              ? Hn(r !== Wn.SESSION, t, 'unsupported-persistence-type')
              : a()
              ? Hn(r === Wn.NONE, t, 'unsupported-persistence-type')
              : xn()
              ? Hn(
                  r === Wn.NONE || (r === Wn.LOCAL && u()),
                  t,
                  'unsupported-persistence-type',
                )
              : Hn(r === Wn.NONE || Fn(), t, 'unsupported-persistence-type');
          let n;
          switch (e) {
            case Wn.SESSION:
              n = Kt;
              break;
            case Wn.LOCAL:
              var i = await z(cr)._isAvailable();
              n = i ? cr : Bt;
              break;
            case Wn.NONE:
              n = ge;
              break;
            default:
              return M('argument-error', { appName: this._delegate.name });
          }
          return this._delegate.setPersistence(n);
        }
        signInAndRetrieveDataWithCredential(e) {
          return this.signInWithCredential(e);
        }
        signInAnonymously() {
          return Xn(
            this._delegate,
            (async function (e) {
              const t = Le(e);
              if (
                (await t._initializationPromise,
                null !== (r = t.currentUser) && void 0 !== r && r.isAnonymous)
              )
                return new st({
                  user: t.currentUser,
                  providerId: null,
                  operationType: 'signIn',
                });
              var r = await it(t, { returnSecureToken: !0 }),
                r = await st._fromIdTokenResponse(t, 'signIn', r, !0);
              return await t._updateCurrentUser(r.user), r;
            })(this._delegate),
          );
        }
        signInWithCredential(e) {
          return Xn(this._delegate, mt(this._delegate, e));
        }
        signInWithCustomToken(e) {
          return Xn(this._delegate, _t(this._delegate, e));
        }
        signInWithEmailAndPassword(e, t) {
          return Xn(
            this._delegate,
            ((r = this._delegate),
            (e = e),
            (t = t),
            mt(I(r), $e.credential(e, t))),
          );
          var r;
        }
        signInWithEmailLink(e, t) {
          return Xn(
            this._delegate,
            (async function (e, t, r) {
              var n = I(e),
                i = $e.credentialWithLink(t, r || B());
              return (
                j(
                  i._tenantId === (n.tenantId || null),
                  n,
                  'tenant-id-mismatch',
                ),
                mt(n, i)
              );
            })(this._delegate, e, t),
          );
        }
        signInWithPhoneNumber(e, t) {
          return Zn(
            this._delegate,
            (async function (e, t, r) {
              const n = Le(e);
              var i = await wr(n, t, I(r));
              return new Ir(i, (e) => mt(n, e));
            })(this._delegate, e, t),
          );
        }
        async signInWithPopup(e) {
          return (
            ti(
              Vn(),
              this._delegate,
              'operation-not-supported-in-this-environment',
            ),
            Xn(
              this._delegate,
              (async function (e, t, r) {
                var n = Le(e);
                x(e, t, Je);
                var i = br(n, r);
                const s = new Nr(n, 'signInViaPopup', t, i);
                return s.executeNotNull();
              })(this._delegate, e, Kn),
            )
          );
        }
        async signInWithRedirect(e) {
          return (
            ti(
              Vn(),
              this._delegate,
              'operation-not-supported-in-this-environment',
            ),
            await zn(this._delegate),
            xr(this._delegate, e, Kn)
          );
        }
        updateCurrentUser(e) {
          return this._delegate.updateCurrentUser(e);
        }
        verifyPasswordResetCode(e) {
          return (async function (e, t) {
            var r = (await kt(I(e), t))['data'];
            return r.email;
          })(this._delegate, e);
        }
        unwrap() {
          return this._delegate;
        }
        _delete() {
          return this._delegate._delete();
        }
        linkUnderlyingAuth() {
          this._delegate.wrapped = () => this;
        }
      }
      function ni(e, t, r) {
        let n = e;
        'function' != typeof e && ({ next: n, error: t, complete: r } = e);
        const i = n;
        return {
          next: (e) => i(e && ei.getOrCreate(e)),
          error: t,
          complete: r,
        };
      }
      ri.Persistence = Wn;
      class ii {
        constructor() {
          (this.providerId = 'phone'),
            (this._delegate = new Tr($n(i.default.auth())));
        }
        static credential(e, t) {
          return Tr.credential(e, t);
        }
        verifyPhoneNumber(e, t) {
          return this._delegate.verifyPhoneNumber(e, t);
        }
        unwrap() {
          return this._delegate;
        }
      }
      (ii.PHONE_SIGN_IN_METHOD = Tr.PHONE_SIGN_IN_METHOD),
        (ii.PROVIDER_ID = Tr.PROVIDER_ID);
      const si = j;
      class ai {
        constructor(e, t, r = i.default.app()) {
          var n;
          si(
            null === (n = r.options) || void 0 === n ? void 0 : n.apiKey,
            'invalid-api-key',
            { appName: r.name },
          ),
            (this._delegate = new yr(e, t, r.auth())),
            (this.type = this._delegate.type);
        }
        clear() {
          this._delegate.clear();
        }
        render() {
          return this._delegate.render();
        }
        verify() {
          return this._delegate.verify();
        }
      }
      (Ln = i.default).INTERNAL.registerComponent(
        new R(
          'auth-compat',
          (e) => {
            var t = e.getProvider('app-compat').getImmediate(),
              r = e.getProvider('auth');
            return new ri(t, r);
          },
          'PUBLIC',
        )
          .setServiceProps({
            ActionCodeInfo: {
              Operation: {
                EMAIL_SIGNIN: A.EMAIL_SIGNIN,
                PASSWORD_RESET: A.PASSWORD_RESET,
                RECOVER_EMAIL: A.RECOVER_EMAIL,
                REVERT_SECOND_FACTOR_ADDITION: A.REVERT_SECOND_FACTOR_ADDITION,
                VERIFY_AND_CHANGE_EMAIL: A.VERIFY_AND_CHANGE_EMAIL,
                VERIFY_EMAIL: A.VERIFY_EMAIL,
              },
            },
            EmailAuthProvider: $e,
            FacebookAuthProvider: Ze,
            GithubAuthProvider: et,
            GoogleAuthProvider: Qe,
            OAuthProvider: Xe,
            SAMLAuthProvider: rt,
            PhoneAuthProvider: ii,
            PhoneMultiFactorGenerator: vn,
            RecaptchaVerifier: ai,
            TwitterAuthProvider: nt,
            Auth: ri,
            AuthCredential: xe,
            Error: h,
          })
          .setInstantiationMode('LAZY')
          .setMultipleInstances(!1),
      ),
        Ln.registerVersion('@firebase/auth-compat', '0.2.15');
    }.apply(this, arguments);
  } catch (e) {
    throw (
      (console.error(e),
      new Error(
        'Cannot instantiate firebase-auth-compat.js - be sure to load firebase-app.js first.',
      ))
    );
  }
});
//# sourceMappingURL=firebase-auth-compat.js.map
