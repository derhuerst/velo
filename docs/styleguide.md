# *velo* styleguide



todo



## Change both code and documentation

Because *velo* doesn't use a (documentation generator](http://en.wikipedia.org/wiki/Documentation_generator), all **documentation changes must be applied to both inline comments and the documentation**.



## Documentation Syntax

Please write document the private an public properties and methods like the following example. Note the spaces between the arguments and the parentheses.

```markdown
### *public* *getter/setter* `position( vector, relative )`
```

Github will generate anchors for every headline. The resulting anchor for this example will then be `#public-gettersetter-position-vector-relative-`.

If there are multiple ways to call a method, specify them like this.

```markdown
### *public* `equals( vector )` or `equals( x, y )`
```