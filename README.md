# File-Manager

For usage type at CLI:

`node ./fc.js --username=SomeName` where: `SomeName` - do not use spaces in username!!

if username= empty, name `Guest` will be used
or

`npm run start-test` (user name implemented for testing purpose).

**Note** (if you check task contact me, please, by discord: @Alitalia22#5200)

- **_If path includes spaces, it must use single or double quotas, for example:_**

`cat "d:/Some path anywere/target file.txt"`

or

`rm 'e/Important document/file to delete.txt'`

### List of operations and their syntax:

#### Navigation & working directory (nwd)

**`up`** - Go upper from current directory (when you are in the root folder this operation shouldn't change working directory)

**`cd`** `path_to_directory` - Go to dedicated folder from current directory (`path_to_directory` can be relative or absolute)

**`ls`** - List all files and folder in current directory and print it to console

#### Basic operations with files

**`cat`** `path_to_file` - Read file and print it's content in console

**`add`** `new_file_name` - Create empty file in current working directory

**`rn`** `path_to_file new_filename` - Rename file

**`cp`** `path_to_file path_to_new_directory` - Copy file

**`mv`** `path_to_file path_to_new_directory` - Move file (same as copy but initial file is deleted)

**`rm`** `path_to_file` - Delete file

#### Operating system info (prints following information in console)

**`os`** `--EOL`- Get EOL (default system End-Of-Line)

**`os`** `--cpus` - Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them)

**`os`** `--homedir`- Get home directory:

**`os`** `--username` - Get current _system user name_ (Do not confuse with the username that is set when the application starts)

**`os`** `--architecture` - Get CPU architecture for which Node.js binary has compiled

#### Hash calculation

**`hash`** `path_to_file` - Calculate hash for file and print it into console

#### Compress and decompress operations

**`compress`** `path_to_file path_to_destination` - Compress file (using Brotli algorithm)

**`decompress`** `path_to_file path_to_destination` - Decompress file (using Brotli algorithm)
