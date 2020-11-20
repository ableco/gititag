const term = require("terminal-kit").terminal;
const simpleGit = require("simple-git");
const git = simpleGit();
const { computeLatest } = require("./utils");

(async () => {
  const { current: branch } = await git.branch();
  term("Welcome to git interactive tag!\n");
  term("Your current branch is: ").green("%s\n", branch);
  term("Do you want to tag/release this? [y|N]\n");
  let prompt = term.yesOrNo({ yes: ["y", "Y"], no: ["n", "N", "ENTER"] });
  let result = await prompt.promise;
  if (!result) {
    term.red("'No' detected. Good bye!\n");
    process.exit();
  }

  const latest = computeLatest(await git.tags());
  term("Latest version detected: ").green("%s\n", latest);

  process.exit();
})();
