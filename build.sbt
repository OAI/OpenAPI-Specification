name := "schema-test"

scalaVersion := "2.9.1-1"

libraryDependencies ++= Seq(
  "com.github.fge" % "json-schema-validator" % "2.1.7",
  "junit"          % "junit"                 % "4.8.1" % "test",
  "org.scalatest" %% "scalatest"             % "1.9.2" % "test"
)
