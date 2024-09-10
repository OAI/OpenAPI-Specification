$inactivityDelay = [timespan]::FromDays([int]::Parse($Env:NO_RECENT_ACTIVITY_DURATION_CLOSE_IN_DAYS))
$oldIssues = gh issue list --label "$Env:NO_RECENT_ACTIVITY_LABEL" --state open --limit 100 --json number,author,createdAt,labels | ConvertFrom-Json | Where-Object {$_.labels.name -notcontains $Env:NEEDS_ATTENTION_LABEL }
foreach($oldIssue in $oldIssues) {
	$lastComment = gh issue view $oldIssue.number --json comments | ConvertFrom-Json | Select-Object -ExpandProperty comments | Where-Object {$_.author.login -eq $oldIssue.author.login} | Select-Object -Last 1
	if($null -eq $lastComment) {
		$lastCommentDate = [Nullable[datetime]]$null
	} else {
		$lastCommentDate = $lastComment.createdAt #powershell already parses the date for us with the json conversion
	}
	$lastLabelEvent = gh api -H "Accept: application/vnd.github+json" -H "X-GitHub-Api-Version: 2022-11-28" "/repos/$($Env:ORG_NAME)/$($Env:REPO_NAME)/issues/$($oldIssue.number)/events?per_page=100" | ConvertFrom-Json | Where-Object {$_.event -eq "labeled" -and $_.label.name -eq "$Env:NO_RECENT_ACTIVITY_LABEL"} | Select-Object -Last 1
	$lastLabelEventDate = $lastLabelEvent.created_at
	if ($null -ne $lastCommentDate -and $lastCommentDate -gt $lastLabelEventDate) {
		gh issue edit $oldIssue.number --remove-label "$Env:NO_RECENT_ACTIVITY_LABEL" --remove-label "$Env:NEEDS_AUTHOR_FEEDBACK_LABEL" --add-label "$Env:NEEDS_ATTENTION_LABEL"
	} elseif (([datetime]::UtcNow - $lastLabelEventDate) -ge $inactivityDelay) {
		gh issue close $oldIssue.number -r "not planned"
	}
}