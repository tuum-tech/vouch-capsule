# Vouch capsule for elastOS
To start, clone vouch-capsule repo
```
git clone https://github.com/tuum-tech/vouch-capsule.git;
cd vouch-capsule
```

# Prerequisites
- Install trinity-cli
```
npm install -g @elastosfoundation/trinity-cli
```
- For complete list of requirements, visit [https://developer.elastos.org/build/elastos/](https://developer.elastos.org/build/elastos/)

# Setup
- Run Vouch RESTAPI Server from [https://github.com/tuum-tech/vouch-restapi-backend](https://github.com/tuum-tech/vouch-restapi-backend)
- Run DID Email Validator Service from [https://github.com/tuum-tech/did-email-validator](https://github.com/tuum-tech/did-email-validator)

# Run
- Copy env file
```
cp .env.example .env
```
- Build and deploy the capsule to android device/emulator
```
trinity-cli run -p android
```

# Deploying to production
- If you're using jscrambler and would like to only protect certain files,
```
grep -nr string_to_search_for build/static | sed 's/ *:.*//'
```