import { execSync } from 'child_process'

export const getReleaseNotes = () => {
  let command = 'git log --oneline --pretty=format:"%s"'

  try {
    // Check if there are any tags
    execSync('git describe --tags')
    // If the above command doesn't throw an error, use the original command
    command =
      'git log $(git describe --tags --abbrev=0)..HEAD --oneline --pretty=format:"%s"'
  } catch (error) {
    // If an error is thrown, it means there are no tags, so we'll use the fallback command
  }

  const result = execSync(command).toString().trim().split('\n')
  return result
}
