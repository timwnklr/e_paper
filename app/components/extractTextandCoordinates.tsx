import { getDocument } from 'pdfjs-dist';

export async function extractTextAndCoordinates(pdfUrl: string, titleText: string) {
  // Load the PDF document
  const pdf = await getDocument(pdfUrl).promise;
  
  // Create an array to store the coordinates of the title and the end of the article on each page
  const coordinates = [];

  // Iterate through each page
  for (let i = 0; i < pdf.numPages; i++) {
    const page = await pdf.getPage(i + 1);
    
    // Variables to hold the coordinates of the title and the end of the article
    let title_coordinates = null;
    let end_coordinates = null;

    // Get text content along with item coordinates
    const textContent = await page.getTextContent();

    // Iterate through each text item
    textContent.items.forEach((item: any) => {
      const { str, transform } = item;
      const [x, y] = [transform[4], transform[5]];  // x and y coordinates

      // Check if the text item matches the title text
      if (str.includes(titleText)) {
        title_coordinates = { x, y };
        console.log(`Title found on page ${i + 1} at coordinates: (${x}, ${y})`);
      }
    });

    // To find the end of the article, you might look for specific text or calculate based on the page dimensions
    const { height } = page.getViewport({ scale: 1 });
    end_coordinates = { x: 0, y: height };  // Assuming the article ends at the bottom of the page
    console.log(`End of the article on page ${i + 1} is at y-coordinate: ${height}`);

    // Store the coordinates for this page
    coordinates.push({ title_coordinates, end_coordinates });
  }
  
  // Return the coordinates
  return coordinates;
}
