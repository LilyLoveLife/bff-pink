
#!/bin/bash

# var branch  = $CI_COMMIT_REF_NAME

pm2 start deployConfig/develop.config.json
