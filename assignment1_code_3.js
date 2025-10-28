import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.sql.*;
import java.util.Scanner;

public class VulnerableApp {

    private static final String DB_URL = System.getenv("APP_DB_URL");
    private static final String DB_USER = System.getenv("APP_DB_USER");
    private static final String DB_PASSWORD = System.getenv("APP_DB_PASSWORD");


    public static String getData() {
    StringBuilder result = new StringBuilder();
        try {
        URL url = new URL("http://insecure-api.com/get-data");
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        InputStream inputStream = conn.getInputStream();
        BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
        String line;

        while ((line = reader.readLine()) != null) {
            result.append(line);
        }

        reader.close();
    } catch (Exception e) {
        System.out.println("Error fetching data: " + e.getMessage());
    }

    return result.toString();
}

    public static void sendEmail(String to, String subject, String body) {
    
        if (!to.matches("^[\\w._%+-]+@[\\w.-]+\\.[A-Za-z]{2,6}$")) { logger.warning("Invalid email address format: " + to);
        return;
    }
        if (subject == null || subject.isBlank() || body == null) {
        logger.warning("Subject or body is missing.");
        return;
    }

        try {
        logger.info("Sending email to: " + to);logger.info("Subject: " + subject); logger.info("Body: " + body);
        
    } catch (Exception e) {
        logger.log(Level.SEVERE, "Error sending email: " + e.getMessage(), e);
    }
}

    public static String getData() {
            String target = "https://insecure-api.com/get-data"; // use HTTPS
            StringBuilder result = new StringBuilder();
            HttpURLConnection conn = null;
        try {URL url = new URL(target);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");

            InputStream inputStream = conn.getInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
            String line;

            while ((line = reader.readLine()) != null) {
                result.append(line);
            }

            reader.close();
        } catch (Exception e) {
            System.out.println("Error fetching data: " + e.getMessage());
        }

        return result.toString();
    }

    public static void sendEmail(String to, String subject, String body) {
        try {String command = String.format("echo %s | mail -s \"%s\" %s", body, subject, to);
        Runtime.getRuntime().exec(command);
    } catch (Exception e) {
        System.out.println("Error sending email: " + e.getMessage());
    }
}

    public static void main(String[] args) {
        String userInput = getUserInput();
        String data = getData();
        saveToDb(data);
        sendEmail("admin@example.com", "User Input", userInput);
    }
}