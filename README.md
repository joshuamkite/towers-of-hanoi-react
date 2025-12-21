# Towers of Hanoi - React + TypeScript + Bun

Implementation of the classic Towers of Hanoi puzzle game built with React, TypeScript, and Bun.

![Towers of Hanoi Game](https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=flat&logo=typescript)
![Bun](https://img.shields.io/badge/Bun-1.1.26-000000?style=flat&logo=bun)
![Vite](https://img.shields.io/badge/Vite-7.3.0-646CFF?style=flat&logo=vite)
![OpenTofu](https://img.shields.io/badge/OpenTofu-1.10+-FFDA18?style=flat&logo=opentofu&logoColor=000000)

- [Towers of Hanoi - React + TypeScript + Bun](#towers-of-hanoi---react--typescript--bun)
  - [About the Game](#about-the-game)
  - [Features](#features)
  - [Project Structure](#project-structure)
    - [Minimum Moves Formula](#minimum-moves-formula)
  - [Local Development](#local-development)
    - [Prerequisites](#prerequisites)
    - [Available Scripts](#available-scripts)
  - [Key Components](#key-components)
    - [Game Logic (`useHanoiGame.ts`)](#game-logic-usehanoigamets)
    - [Components](#components)
  - [Styling](#styling)
  - [Technologies Used](#technologies-used)
  - [AWS Deployment](#aws-deployment)
    - [Updating the Website](#updating-the-website)
    - [Manual Cache Invalidation](#manual-cache-invalidation)
  - [Requirements](#requirements)
  - [Providers](#providers)
  - [Modules](#modules)
  - [Resources](#resources)
  - [Inputs](#inputs)
  - [Outputs](#outputs)


## About the Game

The Towers of Hanoi is a classic mathematical puzzle where the objective is to move all disks from the first tower to the last tower, following these rules:

1. Only one disk can be moved at a time
2. A disk can only be placed on top of a larger disk
3. All disks must end up on the third tower

## Features

- **Dual Input Methods** - Click to select/move OR drag and drop disks
- **Drag and Drop** - Grab and drag disks between towers with visual feedback
- **Dark/Light Mode** - Automatically adapts to your system preferences
- **Beautiful UI** - Clean design, colorful disks, and smooth animations
- **Move Tracking** - See your current moves and compare with the optimal solution
- **Adjustable Difficulty** - Choose from 3 to 8 disks
- **Victory Celebration** - Special message when you complete the puzzle
- **Fast Refresh** - Instant updates during development with Vite HMR
- **Reset Functionality** - Start over anytime
- **Move Validation** - Prevents invalid moves automatically

## Project Structure

```
towers-of-hanoi-react/
├── frontend/                  # React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Game.tsx          # Main game component
│   │   │   ├── Tower.tsx          # Individual tower display
│   │   │   └── Disk.tsx           # Disk component
│   │   ├── styles/
│   │   │   ├── Game.css           # Game styling
│   │   │   ├── Tower.css          # Tower styling
│   │   │   └── Disk.css           # Disk styling
│   │   ├── types.ts               # TypeScript type definitions
│   │   ├── useHanoiGame.ts        # Custom hook for game logic
│   │   ├── App.tsx                # Root component
│   │   ├── App.css                # App styling
│   │   ├── main.tsx               # Entry point
│   │   └── index.css              # Global styles
│   ├── public/                    # Static assets
│   ├── index.html                 # HTML template
│   ├── package.json               # Project dependencies
│   ├── tsconfig.json              # TypeScript configuration
│   └── vite.config.ts             # Vite configuration
│
└── terraform/                 # Infrastructure as Code
    ├── frontend.tf            # Static website module configuration
    ├── main.tf                # Main configuration
    ├── variables.tf           # Variable definitions
    ├── outputs.tf             # Output definitions
    ├── versions.tf            # Provider versions
    └── backend.tf             # S3 backend configuration
```

### Minimum Moves Formula

The minimum number of moves to solve the puzzle is: **2^n - 1** (where n is the number of disks)

- 3 disks: 7 moves
- 4 disks: 15 moves
- 5 disks: 31 moves
- 6 disks: 63 moves
- 7 disks: 127 moves
- 8 disks: 255 moves

## Local Development

### Prerequisites
- Node.js or Bun runtime
- npm or bun package manager

### Available Scripts

```bash
cd frontend
bun run dev      # Start development server
bun run build    # Build for production
bun run preview  # Preview production build
bun run lint     # Run ESLint
```

The app will be available at `http://localhost:5173`

## Key Components

### Game Logic (`useHanoiGame.ts`)

Custom React hook that manages:
- Game state (towers, disks, moves)
- Move validation (both click and drag-and-drop)
- Tower selection
- Direct disk movement between towers
- Win condition detection
- Game reset functionality

### Components

- **Game** - Main container with controls, stats, victory message, and drag event coordination
- **Tower** - Individual tower with pole, base, disk stack, and drop zone functionality
- **Disk** - Draggable disk component with size-based width, visual feedback, and HTML5 drag API

## Styling

The game features:
- Automatic dark/light mode based on system preferences
- Clean, minimal background design
- Color-coded disks (8 unique colors)
- Smooth hover and drag animations
- Context-aware colors that adapt to theme
- Selected tower highlighting (blue border)
- Drag-over tower highlighting (green dashed border)
- Grab/grabbing cursor states for draggable disks
- Responsive design
- Victory modal overlay

## Technologies Used

- **React 19.2.3** - UI framework
- **TypeScript 5.9.3** - Type safety
- **Bun** - Fast JavaScript runtime and package manager
- **Vite 7.3.0** - Build tool
- **CSS3** - Styling and animations

---

## AWS Deployment

This project is deployed to AWS as a static website using OpenTofu/Terraform and my own [static-website-s3-cloudfront-acm](https://registry.terraform.io/modules/joshuamkite/static-website-s3-cloudfront-acm/aws) Terraform module which provides:

- **S3 Bucket** - Stores the static website files
- **CloudFront Distribution** - CDN for fast global delivery
- **ACM Certificate** - SSL/TLS certificate for HTTPS
- **Route53 Records** - DNS configuration for your domain
- **SPA Support** - Error responses configured to support React Router

### Updating the Website

When you make changes to the frontend the Terraform configuration will:
1. Detect source file changes
2. Rebuild the React app
3. Sync new files to S3
4. Invalidate CloudFront cache

### Manual Cache Invalidation

If needed, you can manually invalidate the CloudFront cache:

```bash
aws cloudfront create-invalidation \
  --distribution-id <distribution-id> \
  --paths '/*'
```

 <!-- BEGIN_TF_DOCS -->
## Requirements

| Name | Version |
|------|---------|
| <a name="requirement_terraform"></a> [terraform](#requirement\_terraform) | >= 1.10.0 |
| <a name="requirement_aws"></a> [aws](#requirement\_aws) | >=6.26.0 |

## Providers

| Name | Version |
|------|---------|
| <a name="provider_aws"></a> [aws](#provider\_aws) | 6.27.0 |
| <a name="provider_null"></a> [null](#provider\_null) | 3.2.4 |

## Modules

| Name | Source | Version |
|------|--------|---------|
| <a name="module_frontend_website"></a> [frontend\_website](#module\_frontend\_website) | registry.terraform.io/joshuamkite/static-website-s3-cloudfront-acm/aws | 2.4.0 |

## Resources

| Name | Type |
|------|------|
| [null_resource.build_frontend](https://registry.terraform.io/providers/hashicorp/null/latest/docs/resources/resource) | resource |
| [null_resource.invalidate_cloudfront](https://registry.terraform.io/providers/hashicorp/null/latest/docs/resources/resource) | resource |
| [null_resource.sync_frontend_to_s3](https://registry.terraform.io/providers/hashicorp/null/latest/docs/resources/resource) | resource |
| [aws_caller_identity.current](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/caller_identity) | data source |
| [aws_region.current](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/region) | data source |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_aws_region"></a> [aws\_region](#input\_aws\_region) | AWS region for deployment | `string` | `"eu-west-2"` | no |
| <a name="input_backend_bucket"></a> [backend\_bucket](#input\_backend\_bucket) | S3 bucket for Terraform state | `string` | n/a | yes |
| <a name="input_backend_key"></a> [backend\_key](#input\_backend\_key) | S3 key for Terraform state file | `string` | n/a | yes |
| <a name="input_backend_region"></a> [backend\_region](#input\_backend\_region) | AWS region for Terraform state bucket | `string` | n/a | yes |
| <a name="input_default_tags"></a> [default\_tags](#input\_default\_tags) | Default tags to apply to all resources | `map(string)` | <pre>{<br/>  "ManagedBy": "opentofu",<br/>  "Project": "towers-of-hanoi"<br/>}</pre> | no |
| <a name="input_domain_name"></a> [domain\_name](#input\_domain\_name) | Domain name for the Towers of Hanoi website | `string` | n/a | yes |
| <a name="input_environment"></a> [environment](#input\_environment) | Environment name (dev, staging, prod) | `string` | `"dev"` | no |
| <a name="input_hosted_zone_name"></a> [hosted\_zone\_name](#input\_hosted\_zone\_name) | Route53 hosted zone name | `string` | n/a | yes |
| <a name="input_parent_zone_name"></a> [parent\_zone\_name](#input\_parent\_zone\_name) | Parent hosted zone name (for subdomains). If not set, uses domain\_name | `string` | `""` | no |
| <a name="input_project_name"></a> [project\_name](#input\_project\_name) | Name of the project | `string` | `"hanoi"` | no |

## Outputs

| Name | Description |
|------|-------------|
| <a name="output_account_id"></a> [account\_id](#output\_account\_id) | AWS Account ID |
| <a name="output_acm_certificate_id"></a> [acm\_certificate\_id](#output\_acm\_certificate\_id) | ACM certificate ID |
| <a name="output_cloudfront_distribution_id"></a> [cloudfront\_distribution\_id](#output\_cloudfront\_distribution\_id) | CloudFront distribution ID (for cache invalidation) |
| <a name="output_cloudfront_domain_name"></a> [cloudfront\_domain\_name](#output\_cloudfront\_domain\_name) | CloudFront distribution domain name |
| <a name="output_s3_bucket_id"></a> [s3\_bucket\_id](#output\_s3\_bucket\_id) | S3 bucket ID (name) |
| <a name="output_website_url"></a> [website\_url](#output\_website\_url) | Website URL |
<!-- END_TF_DOCS -->
