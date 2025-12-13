package main

import (
    "bytes"
    "encoding/json"
    "io/ioutil"
    "net/http"
    "log"
    "github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"
)

type ScrapeRequest struct {
    URL string `json:"url"`
}

type IngredientGroup struct {
    Purpose     string   `json:"purpose"`
    Ingredients []string `json:"ingredients"`
}

type InstructionGroup struct {
    Title string   `json:"title"`
    Steps []string `json:"steps"`
}

type ScrapeResponse struct {
    Title            string            `json:"title"`
    Ingredients      []string          `json:"ingredients"`
    IngredientGroups []IngredientGroup `json:"ingredientGroups"`
    InstructionGroups []InstructionGroup `json:"instructionGroups"`
    Instructions     string            `json:"instructions"`
    Image            string            `json:"image"`
}

func main() {
    r := gin.Default()

    // Allow frontend (localhost:3000) to call backend
    r.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"http://localhost:3000"},
        AllowMethods:     []string{"POST", "GET", "OPTIONS"},
        AllowHeaders:     []string{"Origin", "Content-Type"},
        AllowCredentials: true,
    }))

    // Health check
    r.GET("/health", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{"status": "ok"})
    })

    // Scrape endpoint
    r.POST("/scrape", func(c *gin.Context) {
        var req ScrapeRequest
        if err := c.BindJSON(&req); err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
            return
        }

        // Forward request to Python scraper service
        scraperURL := "http://scraper:5000/scrape" // "scraper" is the Docker Compose service name
        body, _ := json.Marshal(req)
        resp, err := http.Post(scraperURL, "application/json", bytes.NewBuffer(body))
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "scraper service unavailable"})
            return
        }
        defer resp.Body.Close()

        data, _ := ioutil.ReadAll(resp.Body)

        // 👇 Debug log: print raw JSON from scraper
        //c.Writer.WriteString("DEBUG: Raw scraper response:\n")
        //c.Writer.Write(data)
        //c.Writer.WriteString("\n")
        log.Printf("Raw scraper response: %s\n", data)

        var scrapeResp ScrapeResponse
        if err := json.Unmarshal(data, &scrapeResp); err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "invalid scraper response"})
            return
        }

        // Return scraper data to frontend
        c.JSON(http.StatusOK, scrapeResp)
    })

    r.Run(":8080")
}
