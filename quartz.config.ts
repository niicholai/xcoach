import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Docs With Friends",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "docs-with-friends.houseblack.org",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#f8fbff",       // var(--note)
          lightgray: "#eef3fd",   // var(--outer-bar) / UI elements
          gray: "#697580",        // var(--soft-text) / metadata
          darkgray: "#30353a",    // var(--text) / body text
          dark: "#c14343",        // var(--headers) / headings
          secondary: "#cd2626",   // var(--lite-accent) / links
          tertiary: "#912e2e",    // var(--accent) / hover states
          highlight: "rgba(229, 149, 149, 0.37)", // var(--highlight)
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#101418",       // WAS: #1a1e24 (Deepened for contrast)
          lightgray: "#20252e",   // WAS: #252c36 (Slightly darker UI elements)
          gray: "#97a1b9",
          darkgray: "#bccad8",
          dark: "#c14343",
          secondary: "#c94d4d",
          tertiary: "#863737",
          highlight: "rgba(122, 20, 20, 0.4)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
