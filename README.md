# AI Expertise Landing Page

A professional landing page for showcasing AI courses and consulting services. This landing page is designed to be hosted on GitHub Pages.

## Features

- Responsive design that works on all devices
- Clean, modern UI with a focus on conversion
- Sections for courses, consulting services, about, and contact
- Newsletter signup form
- Contact form
- Smooth scrolling and animations

## Setup and Deployment

### Local Development

To run this site locally:

1. Clone this repository
2. Open the `index.html` file in your browser

### Deploying to GitHub Pages

1. Create a GitHub repository
2. Push this code to the repository
3. Go to repository Settings > Pages
4. Select the branch you want to deploy (usually `main` or `master`)
5. Your site will be available at `https://yourusername.github.io/repository-name/`

## Customization

### Personal Information

- Update your name, email, and location in the `index.html` file
- Replace `images/profile.jpg` with your own profile photo
- Update social media links in the About section

### Colors and Styling

- The color scheme can be modified in the `:root` section of `css/styles.css`
- Fonts can be changed by updating the Google Fonts link in the `<head>` section

### Course Information

- Update course details in the Courses section of `index.html`
- Add or remove course cards as needed

## Form Handling

The contact and newsletter forms currently don't submit to a backend. To make them functional:

1. Set up a form handling service like Formspree, Netlify Forms, or a custom backend
2. Update the form action and method attributes in `index.html`
3. Modify the form submission handling in `js/main.js`

## License

This project is open source and available under the MIT License.
