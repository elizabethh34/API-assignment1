# Bus Stop and Schedule Finder

This web app utilizes Winnipeg Transit's API to show users bus stop and schedule information.

#### Hosted Site [https://winnipegtransit-bustimes-finder.netlify.app/](https://winnipegtransit-bustimes-finder.netlify.app/#)

## Features:

- Users enter a search term into a input and search is done on pressing the enter key
- The search will return a list of streets that match the query
- Clicking on a street in the returned list will display the next two buses, for each route, at all the stops on the selected street

## Implementation
- Provide a `search` function that will allow users to search for a particular street by nameusing the Winnipeg Trasnit API.
  - If there are no streets that match, indicate with a short message indicating that no results were found.
  - If there are streets that match, provide a clickable link for each street below the search box, in the results pane.
  - All previous results should be removed, before new results are added.
  - Display the full, long version of the street names, which requires a special queryString parameter be passed into the `streets` endpoint: `usage=long`.

- When a user clicks on a street, get all the stops on the chosen street.

- Take these results and  find the next 2 buses for each route, and populate that data into the table at each stop using the stop schedules endpoint

- Using all the information accumalated so far, output the following pieces of information: 
  - The name of the stop
  - The name of the cross street
  - The direction
  - The scheduled arrival time of the next 2 buses for each route at this stop.
  - The route number(bus #) for each of these buses.
  - The name of the street (this is displayed ABOVE the table)