if [[ $(curl -s https://raw.githubusercontent.com/renatomoor/slack-alfred-workflow/main/VERSION) == $(cat ./VERSION) ]]; then
    echo "You have the latest version of slack-workflow"
else
    echo "There is a new version of slack-workflow"
    echo "Please install the new version and remove the old one."
    curl -LJO https://github.com/renatomoor/slack-alfred-workflow/raw/main/docs/documents/slack-workflow.alfredworkflow
    open -a "Alfred 5" slack-workflow.alfredworkflow
fi
