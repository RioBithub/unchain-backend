This Project is used to handle unchain app requirement

### Prerequisites

What things you need to install the software and how to install them

```
Node.js version 18
Node Package Manager
Postgresql
```

### API Documentation

This API documentation provides a complete guide to integrating and managing Unchain application services. With features that include user management, activity history, and dashboards, this API makes it easy for developers to implement the necessary functionality for their applications.

[API Documentation](https://documenter.getpostman.com/view/6720324/2sAYHxn3dA)

### Installing

A step by step series of examples that tell you have to get a development env running

- Create ENV file (.env) with this configuration:
```
DATABASE_URL=
MODEL_SUGAR_LEVEL_URL = 
MODEL_USER_BEHAVIOUR_URL = 
```
- Then run this command
```
$ npm install
$ npm run dev
```

### Deployment using GCP

How to deploy a project using Google Cloud Build with a cloudbuild-prod.yaml configuration file. The steps provided will guide you through setting up and deploying your application.

**Before starting, ensure you have the following:**
- A Google Cloud project with billing enabled. 
- Cloud Build API enabled in your Google Cloud project.

**Configure Cloud Build Trigger**

1. **Open Cloud Build Triggers Page**
    - Go to the Google Cloud Console.
    - Navigate to **Cloud Build** > **Triggers**.

1. **Create a New Trigger**
    - Click on **Create Trigger**.
    - **Select Source Repository**: Choose the repository you want to link the trigger to.
    - **Event**: Set the event to **Tag push**. This means the trigger will fire when a new tag is pushed to the repository.
    - **Branch**: Specify which tags should trigger the build (e.g., `v.*` for version tags).

1. **Configure the Build Trigger**
    - **Name**: Give your trigger a name for easy identification.
    - **Description**: Optionally, add a description to explain the purpose of the trigger.

1. **Build Configuration**
    - **Configuration**: Choose `cloudbuild-prod.yaml` as the build configuration file.
    - **Location**: Specify the path to your `cloudbuild-prod.yaml` file, usually in the root directory.

1. **Save the Trigger**
    - Review all configurations.
    - Click **Create** to save the trigger.

**Push a Tag to Your Repository**
```
git tag v1.0
git push origin v1.0
```

### Built With

- [Express] - The rest framework used
- [Npm] - Dependency Management
- [Docker] - Container Management

### Authors

* **UnChain** - *C242-PS395* - [Github](https://github.com/unChain-Capstone/)

### Contributors
| Bangkit ID | Name | Learning Path |
|------------|------|---------------|
| C012B4KY1776 | Hidayatus Sholikhin | Cloud Computing |
| C128B4KY1056 | Deva Alvyn Budinugraha | Cloud Computing |