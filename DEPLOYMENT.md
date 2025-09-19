# Deployment Guide

This guide explains how to deploy the Zaryflo AJO Personalization Demo to GitHub Pages.

## Prerequisites

- GitHub account
- Git installed on your local machine
- Adobe Experience Platform account (optional, for full functionality)

## Deployment Steps

### 1. Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click "New repository"
3. Name it `zaryflo.github.io` (this enables GitHub Pages automatically)
4. Make it public
5. Don't initialize with README (we already have files)

### 2. Upload Files

#### Option A: Using Git (Recommended)

```bash
# Clone your repository
git clone https://github.com/yourusername/zaryflo.github.io.git
cd zaryflo.github.io

# Copy all files from this demo to the repository
cp /path/to/this/demo/* .

# Add files to git
git add .

# Commit changes
git commit -m "Initial commit: AJO Personalization Demo"

# Push to GitHub
git push origin main
```

#### Option B: Using GitHub Web Interface

1. Go to your repository on GitHub
2. Click "uploading an existing file"
3. Drag and drop all files from this demo
4. Commit the changes

### 3. Configure GitHub Pages

1. Go to your repository settings
2. Scroll down to "Pages" section
3. Under "Source", select "Deploy from a branch"
4. Choose "main" branch and "/ (root)" folder
5. Click "Save"

### 4. Access Your Site

Your site will be available at: `https://yourusername.github.io`

## Configuration

### Basic Setup (Demo Mode)

The site works out of the box in demo mode. No additional configuration needed.

### Full AJO Integration

1. **Get Adobe Experience Platform Credentials**:
   - Log into Adobe Experience Platform
   - Go to Datastreams
   - Create a new datastream
   - Note your Edge Config ID and Organization ID

2. **Update Configuration**:
   - Edit `config.js` in your repository
   - Replace placeholder values with your actual credentials
   - Commit and push changes

3. **Set up AJO Campaigns**:
   - Create campaigns in Adobe Journey Optimizer
   - Use surface name `#sample-json-content`
   - Reference `ajo-campaign-examples.json` for content format

## Customization

### Branding

1. **Update Colors**: Modify `style.css`
2. **Change Logo**: Replace images in `img/` folder
3. **Update Content**: Edit text in `index.html`

### Personalization

1. **Add New Surfaces**: Update HTML and JavaScript
2. **Custom Content Types**: Modify `script.js`
3. **Additional Tracking**: Add new event handlers

## Troubleshooting

### Common Issues

1. **Site not loading**:
   - Check that all files are in the root directory
   - Verify GitHub Pages is enabled
   - Wait a few minutes for deployment

2. **Personalization not working**:
   - Verify your Edge Config ID and Org ID
   - Check browser console for errors
   - Ensure AJO campaigns are published

3. **Images not displaying**:
   - Check file paths in HTML
   - Verify images are in the `img/` folder
   - Use absolute URLs if needed

### Debug Mode

Enable debug mode by setting `debugEnabled: true` in `config.js` to see detailed logs.

## Security Considerations

- Never commit real API keys or secrets
- Use environment variables for sensitive data
- Regularly update dependencies
- Monitor for security vulnerabilities

## Performance Optimization

- Optimize images before uploading
- Enable GZIP compression
- Use CDN for static assets
- Minimize JavaScript and CSS

## Monitoring

- Set up Google Analytics for usage tracking
- Monitor Adobe Experience Platform events
- Check GitHub Pages deployment status
- Set up uptime monitoring

## Updates

To update your site:

1. Make changes locally
2. Test thoroughly
3. Commit changes: `git add . && git commit -m "Update description"`
4. Push to GitHub: `git push origin main`
5. Changes will be live in a few minutes

## Support

For issues with:
- **GitHub Pages**: Check [GitHub Pages documentation](https://docs.github.com/en/pages)
- **Adobe Experience Platform**: Check [AEP documentation](https://experienceleague.adobe.com/docs/experience-platform/)
- **This Demo**: Open an issue in this repository
