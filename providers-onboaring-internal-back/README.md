<!-- markdownlint-disable-next-line MD033 -->
<img width="400" alt="Logo" src="https://lightit.io/images/Logo_full.png" />
<!-- markdownlint-enable MD033 -->

## Provider API — Onboarding Project

This repository serves as a **training and onboarding project** for new team members at Light-it.  
It introduces our **standard Laravel project structure**, development conventions, and quality tools through a hands-on API implementation. As well as serving as the back-end app for [front-end onboarding challenge](https://lightit.slite.com/app/docs/0GnCmIWvderV6i).

The **Provider API** simulates a real-world digital health backend. It includes:

- Authentication flow (sign up, log in, refresh, logout)
- Provider listings with filtering (by clinic, gender, specialty, and favorites)
- Clean, single-action controllers and request validation
- A type-safe architecture with strict mode and DTOs
- A documented REST API powered by **[Scramble](https://scramble.dedoc.co)** for automatic OpenAPI (Swagger) generation (see the link for how to find the generated docs)


## Install

Requirements: Php >= 8.4.0 & Composer

- `brew install php@8.4 composer` Mac OS X with brew
- `apt-get install php8.4` Ubuntu with apt-get (use sudo if is necessary)

This step is not necessary when you use Docker.

### Techs

- Docker
  - Laravel Sail
- Laravel 12.X & Php 8.4
  - Tools
    - Ide Helper
    - Phpstan
    - Php ECS
    - Rector Php
    - XDebug
    - Sentry
    - Telescope in Local Envoriment
  - Single Action and Clean Controllers
  - Request Classes
  - Strict Mode
- Postgresql 16
- Redis
- Meilisearch
- Minio
- Mailpit
- Scramble – Laravel OpenAPI (Swagger) Documentation Generator
- Pest Php for Backend Testing
  - Coverage HTML Report
- Browser Testing with Dusk (using selenium)
- Git
  - PR Template
  - Issue Template
  - Git Hooks with CaptainHook

### Backend Installation

1. Clone GitHub repo for this project locally:

   ```bash
   git clone git@github.com:Light-it-labs/providers-onboaring-internal-back.git
   ```

2. cd into your project and create a copy of your .env file

   ```bash
   cp .env.example .env
   ```

3. Change your Php local version with de Project Version in composer.json

   ```bash
    ./pvm.sh
   ```

4. Generate a JWT secret, copy the output, and paste it into the `JWT_SECRET` variable inside your .env file:

    ```bash
    openssl rand -base64 32
    ```

5. Install composer dependencies with sail included with

    <!-- cspell: disable -->

```bash
   composer install
   ```
or if you dont have composer in you machine you can use:
   ```bash
   composer install
   
   docker run --rm \
     -u "$(id -u):$(id -g)" \
     -v $(pwd):/var/www/html \
     -w /var/www/html \
     laravelsail/php84-composer:latest \
     composer install --ignore-platform-reqs
   ```

   <!-- cspell: enable -->

6. After that you can use (laravel sail)[https://laravel.com/docs/master/sail] for running your project.

   ```bash
   vendor/bin/sail up
   ```

7. When the app is running, into the bash container (`sail bash`) you can use the following commands:

   ```bash
   php artisan key:generate
   php artisan storage:link
   php artisan ide-helper:generate
   php artisan migrate --seed
   ```

## Running

We use (Laravel Sail)[https://laravel.com/docs/master/sail], is a light-weight command-line interface for interacting with Laravel's default Docker development environment. Sail provides a great starting point for building a Laravel application without requiring prior Docker experience.

### Configuring A Bash Alias

By default, Sail commands are invoked using the `vendor/bin/sail` script that is included with all new Laravel applications:

However, instead of repeatedly typing vendor/bin/sail to execute Sail commands, you may wish to configure a Bash alias that allows you to execute Sail's commands more easily:

```bash
alias sail='[ -f sail ] && bash sail || bash vendor/bin/sail'
```

### Starting & Stopping Sail

```bash
sail up
```

To start all the Docker containers in the background, you may start Sail in "detached" mode:

```bash
sail up -d
```

To stop all the containers, you may simply press Control + C to stop the container's execution. Or, if the containers are running in the background, you may use the stop command:

```bash
sail stop
```

### Executing Commands

```bash
# Running Artisan commands locally...
php artisan queue:work

# Running Artisan commands within Laravel Sail...
sail artisan queue:work

# Executing PHP Commands
sail php script.php

# Executing Composer Commands
sail composer require laravel/sanctum

# Running Tests
sail test

# Running with Coverage
sail composer test
```

For more info <https://laravel.com/docs/10.x/sail>


## How to Use in Hoppscotch

### 1. Import the Environment
1. In Hoppscotch, open the **Environments** panel.
2. Click **Import**.
3. Select `environment.json` from the `docs/` directory.
4. Activate the **Provider API - Local** environment.

### 2. Import the Collection
1. In Hoppscotch, open the **Collections** panel.
2. Click **Import**.
3. Select `providers-internal-onboarding.json`.
4. The full Provider API endpoints will now be available to test.

## Testing

To run all test and generate report coverage you can use:
`sail composer test`

In computer science, code coverage is a measure used to describe the degree to which the source code of a program is tested by a particular test suite. A program with high code coverage has been more thoroughly tested and has a lower chance of containing software bugs than a program with low code coverage.

You can see the report open _index.html_ in the report's folder.

### Dusk Test

If you want to run Dusk test, first you need compile files with `vite build` and after that you can use `sail dusk` for running browser test.
_Important_: make sure the vite server is not running

