# aws-serverless-workshop
This workshop has been created for a Skillsharing for SOFA at Aarhus University and AUHACK 2019. Here we go through the process of building a very simple serverless Todo application. This application has the possibility of showing all todos, changing a todo, adding a todo and removing a todo. An extra example of using a serverless applications is that when a new todo is added to a DynamoDB a lambda is triggered, which adds a prefix 'Todo: '.

## Getting Started

The index.html file requires that you add your API endpoint in the url variable. Once this is done it can be uploaded onto an s3 bucket or simply run locally. The lambda folder has the given lambda's that are required for this to work, however the add lambda requires one package 'uniqid'. Therefore the node modules folder must also be uploaded. Alternatively create cloud9 environment and go through the steps of npm init and npm install uniqid.

The serverless_app folder contains an application built with the serverless framework. You will need to set your credentials (access key and secret access key. It is recommended that you create a IAM user instead of using your root account) for serverless to work and change the table variable to your DynamoDB table name or alternatively create a new table with this name.

### Prerequisites

An AWS account.
Nodejs and npm for the serverless application.
The serverless framework

### Installing

Create an AWS account
Download nodejs and npm. Then npm install -g serverless. Set your credentials. Deploy by running the following command:
serverless deploy -v

## Running the tests

No tests

## Deployment

Deploy by running the following command:
serverless deploy -v

## Built With

* [Serverless framework] (https://serverless.com/) - The serverless framework
* [AWS](https://aws.amazon.com//) - Amazon Web Services
* [Nodejs](https://nodejs.org/en/) - Node js

## Authors

* **Andreas Becker Bertelsen** - *Entire workshop* - [Andyandpandy](https://github.com/Andyandpandy)



