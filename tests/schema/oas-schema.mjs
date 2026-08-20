// Configure through our build-infra package so that we
// do not need to maintain the dependencies here.
import { createTestConfig } from "@oai/build-infra/schema/test-config";

export default createTestConfig({
  vocabularyKeywords: [
    { keyword: "discriminator", uri: "https://spec.openapis.org/oas/3.0/keyword/discriminator" },
    { keyword: "example", uri: "https://spec.openapis.org/oas/3.0/keyword/example" },
    { keyword: "externalDocs", uri: "https://spec.openapis.org/oas/3.0/keyword/externalDocs" },
    { keyword: "xml", uri: "https://spec.openapis.org/oas/3.0/keyword/xml" }
  ]
});
