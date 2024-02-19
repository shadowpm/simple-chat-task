import { htmlDecode } from "./htmlDecoder";

describe("htmlDecode function", () => {
  test("decodes HTML entities in a string", () => {
    const encodedStr = "&lt;div&gt;Hello&lt;/div&gt;";
    const decodedStr = htmlDecode(encodedStr);

    expect(decodedStr).toBe("<div>Hello</div>");
  });

  test("handles special characters and symbols", () => {
    const encodedStr = "&amp;&gt;&lt;&quot;&#x27;&#x60;";
    const decodedStr = htmlDecode(encodedStr);

    expect(decodedStr).toBe("&><\"'`");
  });

  test("handles empty string", () => {
    const encodedStr = "";
    const decodedStr = htmlDecode(encodedStr);

    expect(decodedStr).toBe("");
  });
});
