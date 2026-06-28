const Groq = require("groq-sdk");
const Review = require("../models/Review");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const analyzeCode = async (req, res) => {
  try {
    const { patch, repository, pullRequest } = req.body;

    if (!patch) {
      return res.status(400).json({
        message: "Patch is required",
      });
    }

    const prompt = `
You are an elite Staff Software Engineer performing an enterprise-grade GitHub Pull Request review.

Analyze the following PR diff.

Return ONLY valid JSON.

Format:

{
  "overallScore": 87,
  "securityScore": 9,
  "performanceScore": 8,
  "maintainabilityScore": 9,
  "readabilityScore": 8,
  "riskLevel": "LOW",
  "summary": "Short executive summary.",
  "issues": [
    {
      "severity": "CRITICAL",
      "message": "Issue description",
      "suggestion": "How to fix it."
    }
  ]
}

Rules:

overallScore → 0-100

securityScore → 0-10

performanceScore → 0-10

maintainabilityScore → 0-10

readabilityScore → 0-10

riskLevel can ONLY be:
LOW
MEDIUM
HIGH

severity can ONLY be:
CRITICAL
WARNING
SUGGESTION
INFO

Every issue MUST contain:
severity
message
suggestion

Return ONLY JSON.

PR Diff:

${patch}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.2,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const rawText = completion.choices[0].message.content;

    const cleaned = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let review;

    try {
      review = JSON.parse(cleaned);
    } catch (err) {
      console.log(err);

      review = {
        overallScore: 70,
        securityScore: 7,
        performanceScore: 7,
        maintainabilityScore: 7,
        readabilityScore: 7,
        riskLevel: "MEDIUM",
        summary:
          "AI failed to parse the response. Please retry.",
        issues: [
          {
            severity: "WARNING",
            message: "Invalid AI response.",
            suggestion: "Run analysis again.",
          },
        ],
      };
    }

    const savedReview = await Review.create({
      repository: repository || "Unknown Repository",

      pullRequest: pullRequest || 0,

      overallScore: review.overallScore,

      securityScore: review.securityScore,

      performanceScore: review.performanceScore,

      maintainabilityScore:
        review.maintainabilityScore,

      readabilityScore:
        review.readabilityScore,

      riskLevel: review.riskLevel,

      summary: review.summary,

      issues: review.issues,
    });

    res.json(savedReview);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "AI review failed",
    });
  }
};

module.exports = {
  analyzeCode,
};