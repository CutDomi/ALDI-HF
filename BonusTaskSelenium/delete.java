import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import static org.junit.Assert.assertTrue;

public class TaskTests {

    private WebDriver driver;

    @Before
    public void setUp() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://exampledominik.com/login");
        driver.findElement(By.id("username")).sendKeys("testuser");
        driver.findElement(By.id("password")).sendKeys("password123");
        driver.findElement(By.id("loginButton")).click();
    }

    @Test
    public void testDeleteTask() {
        driver.get("https://exampledominik.com/tasks");
        driver.findElement(By.id("newTaskInput")).sendKeys("Task to delete");
        driver.findElement(By.id("addTaskButton")).click();

        WebElement taskRow = driver.findElement(By.xpath("//li[contains(text(), 'Task to delete')]"));
        taskRow.findElement(By.className("deleteButton")).click();

        driver.switchTo().alert().accept();
        
        boolean taskDeleted = driver.findElements(By.xpath("//li[contains(text(), 'Task to delete')]")).isEmpty();
        assertTrue("Task should be deleted", taskDeleted);
    }

    @After
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
