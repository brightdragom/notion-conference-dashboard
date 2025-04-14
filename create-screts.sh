kubectl create secret generic notion-secret --from-literal=NOTION_TOKEN=$1 --from-literal=NOTION_DATABASE_ID=$2 -n conference-dashboard
