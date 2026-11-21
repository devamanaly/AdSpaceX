import fs from "fs/promises";
import path from "path";
import Handlebars from "handlebars";
import { emailConfig } from "../../config/email.config";

// Register global helpers
Handlebars.registerHelper("currentYear", () => new Date().getFullYear());
Handlebars.registerHelper("appName", () => emailConfig.appName);
Handlebars.registerHelper("appUrl", () => emailConfig.appUrl);
Handlebars.registerHelper("supportEmail", () => emailConfig.supportEmail);
Handlebars.registerHelper("eq", (a: any, b: any) => a === b);

const templateCache = new Map<string, Handlebars.TemplateDelegate>();

export async function renderTemplate(
  templateName: string,
  data: Record<string, any>
): Promise<string> {
  let template = templateCache.get(templateName);

  if (!template) {
    const templatePath = path.join(
      process.cwd(),
      "src",
      "modules",
      "Email",
      "Templates",             
      `${templateName}.hbs`
    );

    const source = await fs.readFile(templatePath, "utf-8");
    template = Handlebars.compile(source);

    if (process.env.NODE_ENV === "production") {
      templateCache.set(templateName, template);
    }
  }

  return template({
    ...data,
    appName: emailConfig.appName,
    appUrl: emailConfig.appUrl,
    supportEmail: emailConfig.supportEmail,
    currentYear: new Date().getFullYear(),
  });
}