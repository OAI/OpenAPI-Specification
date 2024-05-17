#!/bin/sh
#
# OVERVIEW
# --------
#
#   This script updates the schema IDs in the following YAML files:
#
#     schemas/v{major}.{minor}/schema.yaml
#     schemas/v{major}.{minor}/schema-base.yaml
#
#   and generates the following JSON files from the updated YAML files:
#
#     schemas/v{major}.{minor}/schema.json
#     schemas/v{major}.{minor}/schema-base.json
#
# USAGE
# -----
#
#   update-schema-id.sh -v VERSION [options]
#
#      -v VERSION
#          specifies the target version in the 'major.minor' format.
#          For example, '-v 3.1'. This option is mandatory.
#
#      -d DATE
#          specifies the release date in the 'YYYY-MM-DD' format.
#          For example, '-d 2024-05-17'. If omitted, the current date is used.
#
#      -n
#          turns on the dry-run mode that shows commands to execute but does not
#          actually execute them.
#
#      -q
#          turns on the quiet mode.
#
#      -h
#          shows this help.
#
# EXAMPLE
# -------
#
#   ./scripts/update-schema-id.sh -v 3.1
#
#   If the above command line is executed on May 7, 2024, the following
#   external commands are invoked by the script.
#
#     ex -s -c '/^$id:/s/^.*$/$id: '\''https:\/\/spec.openapis.org\/oas\/3.1\/schema\/2024-05-07'\''/' \
#           -c wq schemas/v3.1/schema.yaml
#
#     ./scripts/yaml2json/yaml2json.js schemas/v3.1/schema.yaml
#
#     ex -s -c '/^$id:/s/^.*$/$id: '\''https:\/\/spec.openapis.org\/oas\/3.1\/schema-base\/2024-05-07'\''/' \
#           -c '/^$ref:/s/^.*$/$ref: '\''https:\/\/spec.openapis.org\/oas\/3.1\/schema\/2024-05-07'\''/' \
#           -c wq schemas/v3.1/schema-base.yaml
#
#     ./scripts/yaml2json/yaml2json.js schemas/v3.1/schema-base.yaml
#


#------------------------------------------------------------
# Global Variables
#------------------------------------------------------------
__var_version=
__var_date=`date -I -u`
__var_dry_run=off
__var_quiet=off


#------------------------------------------------------------
# __main
#------------------------------------------------------------
__main()
{
    # Process the command line options.
    __process_options "$@"

    # Update schemas/v{major}.{minor}/schema.yaml
    __update_schema_yaml

    # Generate schemas/v{major}.{minor}/schema.json from the updated YAML file.
    __update_schema_json

    # Update schemas/v{major}.{minor}/schema-base.yaml
    __update_schema_base_yaml

    # Generate schemas/v{major}.{minor}/schema-base.json from the updated YAML file.
    __update_schema_base_json
}


#------------------------------------------------------------
# __process_options
#------------------------------------------------------------
__process_options()
{
    while getopts v:d:nqh option
    do
        case $option in
            # Version in the '{major}.{minor}' format.
            v)
                __var_version="${OPTARG}"
                ;;

            # Date in the 'YYYY-MM-DD' format.
            d)
                __var_date="${OPTARG}"
                ;;

            # Dry-Run Mode
            n)
                __var_dry_run=on
                ;;

            # Quiet Mode
            q)
                __var_quiet=on
                ;;

            # Help
            h)
                __help
                exit 0
                ;;

            # Unknown Option
            *)
                # The error message is printed by 'getopts'.
                exit 1
                ;;
        esac
    done

    __validate_version "${__var_version}"
    __validate_date "${__var_date}"
}


#------------------------------------------------------------
# __help
#------------------------------------------------------------
__help()
{
    cat <<__HELP__

USAGE:

    $0 -v VERSION [options]

OPTIONS:

    -v VERSION
        specifies the target version in the 'major.minor' format.
        For example, '-v 3.1'. This option is mandatory.

    -d DATE
        specifies the release date in the 'YYYY-MM-DD' format.
        For example, '-d 2024-05-17'. If omitted, the current date is used.

    -n
        turns on the dry-run mode that shows commands to execute but does not
        actually execute them.

    -q
        turns on the quiet mode.

    -h
        shows this help.

__HELP__
}


#------------------------------------------------------------
# __error_exit
#------------------------------------------------------------
__error_exit()
{
    echo "ERROR: $1" >&2
    exit 1
}


#------------------------------------------------------------
# __validate_version
#------------------------------------------------------------
__validate_version()
{
    version="$1"

    # If the -v option is not specified.
    if [ -z "${version}" ]; then
        __error_exit "The '-v VERSION' option must be specified."
    fi

    # If the argument of the -v option does not match the expected format.
    if ! expr "${version}" : '[0-9][0-9]*\.[0-9][0-9]*$' >/dev/null; then
        __error_exit "The format of the version specified by the -v option is invalid."
    fi
}


#------------------------------------------------------------
# __validate_date
#------------------------------------------------------------
__validate_date()
{
    date="$1"

    # If the argument of the -d option does not match the expected format.
    if ! expr "${date}" : '[0-9][0-9][0-9][0-9]-[0-1][0-9]-[0-3][0-9]$' >/dev/null; then
        __error_exit "The format of the date specified by the -d option is invalid."
    fi
}


#------------------------------------------------------------
# __execute_command
#------------------------------------------------------------
__execute_command()
{
    command=("$@")

    # If the quiet mode is off.
    if [ "${__var_quiet}" = "off" ]; then
        # Print the command.
        echo "${command[@]}"
    fi

    # If the dry-run mode is off.
    if [ "${__var_dry_run}" = "off" ]; then
        # Execute the command.
        "${command[@]}"
    fi
}


#------------------------------------------------------------
# __update_schema_yaml
#------------------------------------------------------------
__update_schema_yaml()
{
    file="schemas/v${__var_version}/schema.yaml"
    id="https:\\/\\/spec.openapis.org\\/oas\\/${__var_version}\\/schema\\/${__var_date}"

    # Prepare a command line to update the $id in the file.
    command=(ex -s -c '/^$id:/s/^.*$/$id: '\'''${id}''\''/' -c wq ${file})

    # Execute the command line.
    __execute_command "${command[@]}"
}


#------------------------------------------------------------
# __update_schema_json
#------------------------------------------------------------
__update_schema_json()
{
    __yaml2json "schemas/v${__var_version}/schema.yaml"
}


#------------------------------------------------------------
# __update_schema_base_yaml
#------------------------------------------------------------
__update_schema_base_yaml()
{
    file="schemas/v${__var_version}/schema-base.yaml"
    id="https:\\/\\/spec.openapis.org\\/oas\\/${__var_version}\\/schema-base\\/${__var_date}"
    ref="https:\\/\\/spec.openapis.org\\/oas\\/${__var_version}\\/schema\\/${__var_date}"

    # Prepare a command line to update the $id and $ref in the file.
    command=(ex -s -c '/^$id:/s/^.*$/$id: '\'''${id}''\''/'
                   -c '/^$ref:/s/^.*$/$ref: '\'''${ref}''\''/'
                   -c wq ${file})

    # Execute the command line.
    __execute_command "${command[@]}"
}


#------------------------------------------------------------
# __update_schema_base_json
#------------------------------------------------------------
__update_schema_base_json()
{
    __yaml2json "schemas/v${__var_version}/schema-base.yaml"
}


#------------------------------------------------------------
# __yaml2json
#------------------------------------------------------------
__yaml2json()
{
    input="$1"

    # Prepare a command line to generate a JSON file from the input file.
    command=(./scripts/yaml2json/yaml2json.js ${input})

    # Execute the command line.
    __execute_command "${command[@]}"
}


#------------------------------------------------------------
# Entry Point
#------------------------------------------------------------
__main "$@"
exit 0
