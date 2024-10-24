#!/bin/env perl
use strict;
use warnings;
use YAML::XS;
use JSON::PP;

print JSON::PP->new->pretty->indent_length(2)->canonical->encode(Load(do { local $/; <> }));
print "\n";
