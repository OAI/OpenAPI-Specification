import com.fasterxml.jackson.databind.ObjectMapper

import scala.io.Source

/**
 * makes the schemas absolute so the java json-schema validator can locate
 * references correctly
 **/
trait TestBase {
  val mapper = new ObjectMapper
  val host = "http://swagger.io/v2/schema.json"
  // val host = "http://localhost:8000/schema.json"

  def readSchema(makeQualified: Boolean = true) = {
    val json = Source.fromFile("schemas/v2.0/schema.json").getLines
    val lines = {
      if(makeQualified) {
        for(line <- json) yield {
          line.replace("\"#/definitions", "\"" + host + "#/definitions")
        }
      }
      else json
    }.mkString
    mapper.readTree(lines)
  }
}
