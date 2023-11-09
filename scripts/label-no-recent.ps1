$inactivityDelay = [timespan]::FromDays([int]::Parse($Env:NO_RECENT_ACTIVITY_DURATION_IN_DAYS))
$oldIssues = gh issue list --label "$Env:NEEDS_AUTHOR_FEEDBACK_LABEL" --state open --limit 100 --json number,author,createdAt | ConvertFrom-Json
foreach($oldIssue in $oldIssues) {
	$lastComment = gh issue view $oldIssue.number --json comments | ConvertFrom-Json | Select-Object -ExpandProperty comments | Where-Object {$_.author.login -eq $oldIssue.author.login} | Select-Object -Last 1
	if($null -eq $lastComment) {
		$lastCommentDate = [datetime]::Parse($oldIssue.createdAt)

	} else {
		$lastCommentDate = [datetime]::Parse($lastComment.createdAt)
	}
	$lastLabelEvent = gh api -H "Accept: application/vnd.github+json" -H "X-GitHub-Api-Version: 2022-11-28" "/repos/$($Env:ORG_NAME)/$($Env:REPO_NAME)/issues/$($oldIssue.number)/events?per_page=100" | ConvertFrom-Json | Where-Object {$_.event -eq "labeled" -and $_.label.name -eq "$Env:NEEDS_AUTHOR_FEEDBACK_LABEL"} | Select-Object -Last 1
	$lastLabelEventDate = [datetime]::Parse($lastLabelEvent.created_at)
	if ($lastCommentDate -gt $lastLabelEventDate) {
		gh issue edit $oldIssue.number --remove-label "$Env:NO_RECENT_ACTIVITY_LABEL" --remove-label "$Env:NEEDS_AUTHOR_FEEDBACK_LABEL" --add-label "$Env:NEEDS_ATTENTION_LABEL"
	} elseif (($lastCommentDate - $lastLabelEventDate) -le $inactivityDelay) {
		gh issue edit $oldIssue.number --add-label "$Env:NO_RECENT_ACTIVITY_LABEL" --remove-label "$Env:NEEDS_ATTENTION_LABEL"
		gh issue comment $oldIssue.number -b "$Env:NO_RECENT_ACTIVITY_COMMENT"
	}
}