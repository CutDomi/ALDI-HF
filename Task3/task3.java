import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

public class TaskApiTests {

    private static String BASE_URL = "https://api.example.com";
    private static int taskId; 

    @BeforeAll
    public static void setup() {
        RestAssured.baseURI = BASE_URL;
    }

    // ---------- POST /tasks ----------
    @Test
    public void createTaskTest() {
        String requestBody = "{ \"title\": \"Test Task\", \"description\": \"API testing\" }";

        Response response = 
            given()
                .contentType(ContentType.JSON)
                .body(requestBody)
            .when()
                .post("/tasks")
            .then()
                .statusCode(201)
                .body("title", equalTo("Test Task"))
                .body("description", equalTo("API testing"))
                .extract().response();

        taskId = response.path("id");
    }

    // ---------- GET /tasks/{id} ----------
    @Test
    public void getTaskByIdTest() {
        given()
            .pathParam("id", taskId)
        .when()
            .get("/tasks/{id}")
        .then()
            .statusCode(200)
            .body("id", equalTo(taskId))
            .body("title", equalTo("Test Task"));
    }

    // ---------- PUT /tasks/{id} ----------
    @Test
    public void updateTaskByIdTest() {
        String updatedBody = "{ \"title\": \"Updated Task\", \"description\": \"Updated description\" }";

        given()
            .contentType(ContentType.JSON)
            .body(updatedBody)
            .pathParam("id", taskId)
        .when()
            .put("/tasks/{id}")
        .then()
            .statusCode(200) 
            .body("title", equalTo("Updated Task"))
            .body("description", equalTo("Updated description"));
    }

    // ---------- DELETE /tasks/{id} ----------
    @Test
    public void deleteTaskByIdTest() {
        given()
            .pathParam("id", taskId)
        .when()
            .delete("/tasks/{id}")
        .then()
            .statusCode(204);

        given()
            .pathParam("id", taskId)
        .when()
            .get("/tasks/{id}")
        .then()
            .statusCode(404); 
    }
}
