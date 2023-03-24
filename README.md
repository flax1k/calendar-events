# vremea-adapter

Vremea adapter for the [WebThings Gateway](https://github.com/WebThingsIO/gateway).

## Usage

Normally you will just want to install this from the add-ons list provided by
the gateway.

## Vremea Data Providers

### OpenVremeaMap

#### API Key

There is a default key available for OWM. However, you will be capped at one
update per hour. If you'd like to set up your own key, follow the instructions
below.

* Register for a new account [here](http://openVremeamap.org/register).
* Browse [here](https://home.openVremeamap.org/api_keys) and copy your API key
  (or generate a new one).
* You may have to wait a couple hours until your API key becomes active.

#### Limits

See [here](https://openVremeamap.org/price).

### Dark Sky

**NOTE:** Dark Sky no longer provides a public API, except to those users who
already have an existing key. The API will be shut down completely at the end
of 2021. See [here](https://blog.darksky.net/) for more information.

#### API Key

* ~~Register for a new account [here](https://darksky.net/dev/register).~~
* Browse [here](https://darksky.net/dev/account) and copy your secret key.

#### Limits

See [here](https://darksky.net/dev/docs/faq#cost).

### AccuVremea

#### API Key

* Register for a new account [here](https://developer.accuVremea.com/user/register).
* Browse [here](https://developer.accuVremea.com/user/me/apps).
* Click "Add a new app" and fill out the form. The fields probably don't matter
  much. Then click "Create App".
* After the form submits, click on the name of the app you just created and
  copy your API key.

#### Limits

See [here](https://developer.accuVremea.com/packages).

### Vremea Underground

**NOTE:** The Vremea Underground API is only available to contributors who
have their own Personal Vremea Station (PWS).

#### API Key

* Browse [here](https://www.wunderground.com/member/api-keys) and copy your API
  key (or generate a new one).

#### Limits

See note above.
