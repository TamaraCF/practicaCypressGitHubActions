const fetch = require('node-fetch');
const base64 = require('nodejs-base64');
const fs = require('fs');
const https = require('https');
const agent = new https.Agent({ rejectUnauthorized: false })

let headers = {};
let baseUrl = '';

// Searches Configuration file for reporting
function verifyConfigFile(configFilePath) {
  let readed = true;
  try {
    fs.accessSync(configFilePath, fs.F_OK);
    let data = fs.readFileSync(configFilePath);
    let json = JSON.parse(data);
    baseUrl = json['jira_url'];
    let username = json['jira_user'];
    let password = json['jira_password'];
    headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${base64.base64encode(`${username}:${password}`)}`
    };
  } catch (err) {
    readed = false;
  }
  return readed;
}

async function checkResponse(response) {
  if (!response.ok) {
    let body = await response.text();
    let message = `Error response received:\nStatus: ${response.status}\nBody: ${body}`;
    throw new Error(message);
  }
  return response;
}

// Get the issue type for the given testPlan
async function getIssueType(testPlan) {
  let issueType = undefined;
  const issueEndpoint = '/rest/api/2/issue/';
  const issueUlr = baseUrl + issueEndpoint + testPlan;

  issueType = await fetch(issueUlr, {
    method: 'GET',
    agent: agent,
    headers: headers
  })
    .then(response => checkResponse(response))
    .then(response => response.json())
    .then(body => { return body.fields.issuetype.name })
    .catch(error => console.log(error));

  return issueType;
}

// Import cucumber report to jira
async function importCucumberReport(reportFile) {
  let issueKey = undefined;
  const importEndpoint = '/rest/raven/1.0/import/execution/cucumber';
  const importUrl = baseUrl + importEndpoint;

  let reportFileData = fs.readFileSync(reportFile);

  issueKey = await fetch(importUrl, {
    method: 'POST',
    agent: agent,
    headers: headers,
    body: reportFileData
  })
    .then(response => checkResponse(response))
    .then(response => response.json())
    .then(body => { return body.testExecIssue.key })
    .catch(error => console.log(error));

  return issueKey;
}

// Add TestExecution to TestPlan
async function addTexecToTestplan(testPlanKey, testExecutionKey) {
  let added = false;
  const testPlanExecutionsEndpoint = `/rest/raven/1.0/api/testplan/${testPlanKey}/testexecution`;
  const testPlanExecutionsUrl = baseUrl + testPlanExecutionsEndpoint;

  added = await fetch(testPlanExecutionsUrl, {
    method: 'POST',
    agent: agent,
    headers: headers,
    body: `{ "add": ["${testExecutionKey}"] }`
  })
    .then(response => checkResponse(response))
    .then(() => true)
    .catch(error => console.log(error));

  return added;
}

// Rename issue
async function changeIssueSummary(issueKey, summary) {
  let changed = false;
  const issueEndpoint = `/rest/api/2/issue/${issueKey}`;
  const issueUrl = baseUrl + issueEndpoint;

  changed = await fetch(issueUrl, {
    method: 'PUT',
    agent: agent,
    headers: headers,
    body: `{ "fields": {"summary": "${summary}"} }`
  })
    .then(response => checkResponse(response))
    .then(() => true)
    .catch(error => console.log(error));

  return changed;
}

module.exports = {
  verifyConfigFile,
  getIssueType,
  importCucumberReport,
  addTexecToTestplan,
  changeIssueSummary
};
