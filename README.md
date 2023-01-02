# Oysho - Regression web.


## Usage
You need to have node.js installed (v12); the first time you need to install the required dependecies:

```bash
npm install
```

You can run your tests with this command:

```bash
npm test -- <cypress options>
```

For example to run the tests tagged as _Great-test_ but not _wip_ you can use:

```bash
npm test -- --env TAGS="@Great-test and not @wip"
```

By default chrome is used for the tests, if you want to use another browser use the -b option:

```bash
npm test -- -b firefox
```

You can also launch the Cypress GUI:

```bash
npm run cypress:open
```

If you want to clean all the screenshots, HTML reports and cucumber.json reports you can run:

```bash
npm run clean
```

Before the _test_ script, the report folder is cleaned. See the _prestest_ script.

## Basic structure

```
.
├── README.md
├── cypress
│   ├── data -> data for the tests
│   ├── environments -> per environment configurations
│   │   └── pre.json
│   ├── fixtures
│   ├── integration -> the tests themselves
│   │   ├── common -> common steps implementations
│   │   ├── login -> feature specific steps implementations
│   │   │   └── login.js
│   │   └── login.feature
│   ├── plugins
│   │   └── index.js
│   └── support
│       ├── commands.d.ts -> custom commands documentation
│       ├── commands.js -> custom commands
│       ├── index.js
│       └── pageObjects -> POMs
│           ├── BasePage.js
│           ├── LoginPage.js
│           └── MainPage.js
├── cypress.json
├── jsconfig.json
├── package-lock.json
├── package.json
└── utils -> reporting utils
    ├── attachment.js
    ├── buildReport.js
    ├── jiraUtils.js
    ├── jira_report_config.json.template -> template to create the jira_report_config.json file
    └── reportJira.js
```

### Configuration files

+ *cypress.env.json*: This file can be used to change the cypress environmnet variables on the local machine. It should never be added to the code base.

+ *.env*: This file could be used to set system environment variables (ex.: proxy configuration, custom options for cypress as CYPRESS_option_name) for the auxiliary scripts. It should never be added to the code base.

+ *utils/jira_report_config.json*: This file contains the credentials used to report to Jira/Xray via API. It should never be added to the code base. There is an example template on `jira_report_config.json.template`

+ *cypress/environments/<environment>.json*: This files contains configurations for the given environment. They will overwrite the options set on `cypress.json` and follow the same format as that file. A special local environment could be created for local tests, this file will be ingnored by git.


## Auxiliar scripts

There are some auxiliar scripts to launch the different linters:

+ lint:js - Will launch eslint
+ lint:js:fix - Will launch eslint with the `fix` option
+ lint:gherkin - Will launch gherkin-lint


## Reporting

Once you finished with testing, it is time for reporting.

First you need to build the reports, an html report and a cucumber.json report will be generated with:

```bash
npm run report:build
```

This will also attach the posible screenshots to the generated json because of a limitation of cypress.

Once the report is created you can import it to Jira/Xray with:

```bash
npm run report:upload -- -k <TestPlan Key>
```

For example:

```bash
npm run report:upload -- -k IXPT-65
```

If you want to give a custom name to the test execution use the option -n:

```bash
npm run report:upload -- -n "Custom name"
```

To create the configruation file `utils/jira_report_config.json` an auxiliary script is provided with the name _report:build:credentials_, it will complete the fields based on the environment variables (hint: use it on CI)

```bash
npm run report:build:credentials
```

## Caveats

Keep in mind that Windows could need to scape the quotes on the cli (with ^):

```bash
npm test -- --env TAGS=^"@Great-test and not @wip^"
```

Also, PowerShell seems to do "funky" things with the parameters; if you can don't use it.
