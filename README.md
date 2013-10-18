## meteor-soundcloud

soundcloud for meteor


-----


### installation
add the soundcloud package with [meteorite](https://github.com/oortcloud/meteorite/) using the following command:

    $ mrt add soundcloud


-----


### api

if you configured your client id and client secret using either the accounts-ui package or manually (http://docs.meteor.com/#meteor_loginwithexternalservice) the `sc.initialize` call will automatically be made. the soundcloud object exposes the `ready()` reactive variable in order to track the sdk initialization state.


-----


### credits
* [@mataspetrikas](https://github.com/mataspetrikas) for the original soundcloud accounts port
