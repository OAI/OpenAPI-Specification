#!/bin/sh
#
# OVERVIEW
# --------
#
#   For the version 3.1 and higher:
#
#     This script does the following.
#
#       1. Switch to the 'gh-pages' branch.
#
#       2. Copy "schemas/v{major}.{minor}/schema.json" in the 'main' branch to
#          "oas/{major}.{minor}/schema/{YYYY-MM-DD}" in the 'gh-pages' branch.
#          The value of {YYYY-MM-DD} is extracted from the '$id' property in
#          the schema.json file.
#
#       3. Create a symbolic link "latest" under "oas/{major}.{minor}/schema"
#          that points to the "{YYYY-MM-DD}" file.
#
#       4. Copy "schemas/v{major}.{minor}/schema-base.json" in the 'main' branch to
#          "oas/{major}.{minor}/schema-base/{YYYY-MM-DD}" in the 'gh-pages' branch.
#          The value of {YYYY-MM-DD} is extracted from the '$id' property in
#          the schema-base.json file.
#
#       5. Create a symbolic link "latest" under "oas/{major}.{minor}/schema-base"
#          that points to the "{YYYY-MM-DD}" file.
#
#   For the version 3.0:
#
#     This script does the following.
#
#       1. Switch to the 'gh-pages' branch.
#
#       2. Copy "schemas/v{major}.{minor}/schema.json" in the 'main' branch to
#          "oas/{major}.{minor}/schema/{YYYY-MM-DD}" in the 'gh-pages' branch.
#          The value of {YYYY-MM-DD} is extracted from the 'id' property in
#          the schema.json file.
#
#       3. Create a symbolic link "latest" under "oas/{major}.{minor}/schema"
#          that points to the "{YYYY-MM-DD}" file.
#
#   For versions older than 3.0:
#
#     This script does not support versions older than 3.0.
#
# USAGE
# -----
#
#   update-schema-latest.sh -v VERSION [options]
#
#      -v VERSION
#          specifies the target version in the 'major.minor' format.
#          For example, '-v 3.1'. This option is mandatory.
#          Versions older than 3.0 are not supported.
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
# EXAMPLE 1 (3.1 or higher)
# -------------------------
#
#   ./scripts/update-schema-latest.sh -v 3.1
#
#   If the above command line is executed, the following external commands
#   are invoked by the script. This example assumes that the value of the
#   '$id' property in the schema files ends with '2022-10-07'.
#
#     git checkout gh-pages
#
#     git show main:schemas/v3.1/schema.json > oas/3.1/schema/2022-10-07
#
#     (cd oas/3.1/schema && ln -sf 2022-10-07 latest)
#
#     git show main:schemas/v3.1/schema-base.json > oas/3.1/schema-base/2022-10-07
#
#     (cd oas/3.1/schema-base && ln -sf 2022-10-07 latest)
#
# EXAMPLE 2 (3.0)
# ---------------
#
#   ./scripts/update-schema-latest.sh -v 3.0
#
#   If the above command line is executed, the following external commands
#   are invoked by the script. This example assumes that the value of the
#   'id' property in the schema files ends with '2021-09-28'.
#
#     git checkout gh-pages
#
#     git show main:schemas/v3.0/schema.json > oas/3.0/schema/2021-09-28
#
#     (cd oas/3.0/schema && ln -sf 2021-09-28 latest)
#
# NOTE
# ----
#
#   This script requires the following external commands.
#
#     - git
#     - jq
#


#------------------------------------------------------------
# Global Variables
#------------------------------------------------------------
__var_version=
__var_major=
__var_minor=
__var_dry_run=off
__var_quiet=off


#------------------------------------------------------------
# __main
#------------------------------------------------------------
__main()
{
    # Process the command line options.
    __process_options "$@"

    # 1. Check out the 'gh-pages' branch.
    __checkout_gh_pages

    # 2. Copy main:schemas/v{major}.{minor}/schema.json to
    #    oas/{major}.{minor}/schema/YYYY-MM-DD.
    #
    # 3. Update oas/{major}.{minor}/schema/latest (symlink) to
    #    make it point to YYYY-MM-DD.
    __update_schema

    # If the version is 3.1 or higher.
    if [ ${__var_major} -gt 3 ] || [ ${__var_minor} -ge 1 ]; then
        # 4. Copy main:schemas/v{major}.{minor}/schema-base.json to
        #    oas/{major}.{minor}/schema-base/YYYY-MM-DD.
        #
        # 5. Update oas/{major}.{minor}/schema-base/latest (symlink) to
        #    make it point to YYYY-MM-DD.
        __update_schema_base
    fi
}


#------------------------------------------------------------
# __process_options
#------------------------------------------------------------
__process_options()
{
    while getopts v:nqh option
    do
        case $option in
            # Version in the '{major}.{minor}' format.
            v)
                __var_version="${OPTARG}"
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
        Versions older than 3.0 are not supported.

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

    # Extract the major number and the minor number.
    __var_major=`echo ${version} | cut -f 1 -d .`
    __var_minor=`echo ${version} | cut -f 2 -d .`

    # If the major number is less than 3.
    if [ ${__var_major} -lt 3 ]; then
        __error_exit "This script does not support versions older than 3.0."
    fi
}


#------------------------------------------------------------
# __execute_command
#------------------------------------------------------------
__execute_command()
{
    command="$1"

    # If the quiet mode is off.
    if [ "${__var_quiet}" = "off" ]; then
        # Print the command.
        echo "${command}"
    fi

    # If the dry-run mode is off.
    if [ "${__var_dry_run}" = "off" ]; then
        # Execute the command.
        sh -c "${command}"
    fi
}


#------------------------------------------------------------
# __checkout_gh_pages
#------------------------------------------------------------
__checkout_gh_pages()
{
    # The command to checkout the 'gh-pages' branch.
    command="git checkout gh-pages"

    # Execute the command.
    __execute_command "${command}"
}


#------------------------------------------------------------
# __update_schema
#------------------------------------------------------------
__update_schema()
{
    __update "schema"
}


#------------------------------------------------------------
# __update_schema_base
#------------------------------------------------------------
__update_schema_base()
{
    __update "schema-base"
}


#------------------------------------------------------------
# __update
#------------------------------------------------------------
__update()
{
    file_base="$1"

    # The source file in the 'main' branch.
    src_file="schemas/v${__var_version}/${file_base}.json"

    # If the version is 3.0.
    if [ ${__var_major} -eq 3 ] && [ ${__var_minor} -eq 0 ]; then
        # Extract the 'YYYY-MM-DD' part of the "id" property.
        date=`git show main:${src_file} | jq -rj '."id"|split("/")|last'`
    else
        # Extract the 'YYYY-MM-DD' part of the "$id" property.
        date=`git show main:${src_file} | jq -rj '."$id"|split("/")|last'`
    fi

    # The destination directory in the 'gh-pages' branch.
    dst_dir="oas/${__var_version}/${file_base}"

    # The destination file in the 'gh-pages' branch.
    dst_file="${dst_dir}/${date}"

    # The command to copy the source file to the destination file.
    copy_command="git show main:${src_file} > ${dst_file}"

    # The command to update the 'latest' file.
    link_command="cd ${dst_dir} && ln -sf ${date} latest"

    # Execute the commands.
    __execute_command "${copy_command}"
    __execute_command "${link_command}"
}


#------------------------------------------------------------
# Entry Point
#------------------------------------------------------------
__main "$@"
exit 0
