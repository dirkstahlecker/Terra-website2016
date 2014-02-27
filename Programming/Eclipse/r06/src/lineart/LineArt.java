package lineart;
import java.util.List;

/**
 * Represents a piece of line art.
 * Invariant: segments are created by connection a list of points of length two
 */
public class LineArt {
    
    private List<int[]> lines;
    
    /**
     * constructor for empty line
     */
    public LineArt() {
        int[] points1 = {0,0,0,0};
        lines.add(points1);
    }
    
    /**
     * constructor for adding lines
     * @param inp list of coordinates, where each coordinate is an int array of [x1,y1,x2,y2]
     */
    public LineArt(List<int[]> inp) {
        lines.addAll(inp);
    }
    
    /**
     * combines two LineArts and returns a new instance of their combination
     * @param inp LineArt to be appended to the end 
     * @return LineArt with input LineArt appended to end 
     */
    public LineArt combine (LineArt inp) {
        List<int[]> points = this.getCoords();
        points.addAll(inp.getCoords());
        return new LineArt(points);
    }
    
    /**
     * get the coordinate list 
     * @return List of int array of [x1,y1,x2,y2]
     */
    public List<int[]> getCoords() {
        
        return this.lines;
    }
    
    public LineArt erase() {
        return new LineArt();
    }
}
