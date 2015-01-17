# Meteor Bootstrap Switch
[![Build Status](https://img.shields.io/travis/ctjp/meteor-bootstrap-switch.svg?style=flat)](https://travis-ci.org/ctjp/meteor-bootstrap-switch)

A customizable Meteor package for [Bootstrap Switch](https://github.com/nostalgiaz/bootstrap-switch). It gives you the option to choose between Bootstrap 2 and 3 themes and modify it as needed.

## Installation

In a Meteor app directory, enter:

```bash
$ meteor add ctjp:meteor-bootstrap-switch
```

## How to Use

#### custom.bootstrap-switch.json

Create a **custom.bootstrap-switch.json** file somewhere in your project (`/client/lib/custom.bootstrap-switch.json` for example). Set the contents as seen below:

```json
{
  "theme": "bootstrap3",
  "standalone": true
}
```

Set the `theme` option to `bootstrap2` if you wish to use the Bootstrap 2 theme or to `bootstrap3` to use the Bootstrap 3 theme. 

If you are using a Bootstrap package (such as [nemo64:bootstrap](https://atmospherejs.com/nemo64/bootstrap)) that includes the `mixins` and `variables` files, you need to set the `standalone` option to `false`.

#### Importing

When you start Meteor, the package will generate the files below in the same directory as the **custom.bootstrap-switch.json** file:

if `standalone` is `true`
- custom.bootstrap-switch.bootstrap2-variables.import.less (if `theme` is `bootstrap2`)
- custom.bootstrap-switch.bootstrap3-variables.import.less (if `theme` is `bootstrap3`)
- custom.bootstrap-switch.build.import.less

Customize the **\*variables.import.less** file and `@import` the **custom.bootstrap-switch.build.import.less** file into your project.

if `standalone` is `false`
- custom.bootstrap-switch.import.less

Note that this assumes that you have the Bootstrap `mixins` and `variables` files in your project. `@import` the **custom.bootstrap-switch.import.less** file into your project.

## Uninstall Package
After removing the package, make sure to remove the generated files from your project.

## Credits
- [nostalgiaz](https://github.com/nostalgiaz/bootstrap-switch) for Bootstrap Switch.
- [Nemo64](https://github.com/Nemo64/meteor-bootstrap) for the Meteor package build plugin.
