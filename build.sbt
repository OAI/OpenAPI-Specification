name := "schema-test"

scalaVersion := "2.10.4"

libraryDependencies ++= Seq(
  "com.github.fge" % "json-schema-validator" % "2.2.5",
  "junit"          % "junit"                 % "4.8.1" % "test",
  "org.scalatest" %% "scalatest"             % "1.9.2" % "test"
)
