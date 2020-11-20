const term = require("terminal-kit").terminal;
const simpleGit = require("simple-git");
const git = simpleGit(process.cwd());
const inc = require("semver/functions/inc");
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
  term("Latest version detected: ").yellow("%s\n", latest);
  term("What kind of release is this?");

  const patchTypes = ["patch", "minor", "major"];
  const optionsText = patchTypes.map(
    (patch) => `${patch} ${inc(latest, patch)}`
  );
  prompt = term.singleColumnMenu(optionsText);
  result = await prompt.promise;

  const toBeVersion = `v${inc(latest, patchTypes[result.selectedIndex])}`;

  term("This will bump ").yellow(latest)(" to ").green(toBeVersion)(
    "\nAre you sure you want to push this? [y|N]\n"
  );
  prompt = term.yesOrNo({ yes: ["y", "Y"], no: ["n", "N", "ENTER"] });
  result = await prompt.promise;
  if (!result) {
    term.red("'No' detected. Good bye!\n");
    process.exit();
  }
  term.spinner();

  const { name: tag } = await git.addTag(toBeVersion);
  const a = await git.push("origin", `refs/tags/${tag}`, ["--force"]);

  term.green("\nDone!")(" Released ").green(`${toBeVersion}\n`);
  process.exit();
})();
