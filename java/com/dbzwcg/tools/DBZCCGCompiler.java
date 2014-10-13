package com.dbzwcg.tools;

import com.dbzwcg.tools.enums.EnumTools;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Set;
import org.apache.commons.io.FileUtils;
import org.reflections.Reflections;

/**
 *
 * @author csiqueira
 */
public class DBZCCGCompiler {

    public static String baseFolder = "C:\\Users\\csiqueira\\Documents\\NetBeansProjects\\DBZWCG\\src\\main\\webapp";
    public static String[] jsOrdered = {
        "game\\Initializer.js",
        "game\\DBZCCG.js",
        "game\\Types.js",
        "game\\Network.js",
        "game\\Match.js",
        "game\\Log.js",
        "game\\Callbacks.js",
        "game\\Card.js",
        "game\\Dragonball.js",
        "game\\Combat.js",
        "game\\Personality.js",
        "game\\MainPersonality.js",
        "game\\Pile.js",
        "game\\DiscardPile.js",
        "game\\RemovedPile.js",
        "game\\CardGroup.js",
        "game\\LifeDeck.js",
        "game\\Player.js",
        "game\\Limits.js",
        "game\\Table.js",
        "game\\Screen.js",
        "game\\General.js",
        "game\\SaiyanSaga.js",
        "game\\FriezaSaga.js",
        "game\\FloatingEffect.js",
        "game\\Sound.js",
        "game\\Album.js",
        "game\\Interface.js"
    };

    private static String[] jsFolder = {
        "lib\\stomp.js",
        "lib\\jquery.min.js",
        "lib\\jquery-ui-1.9.2.custom.min.js",
        "lib\\mousetrap.min.js",
        "lib\\bootbox.min.js",
        "lib\\ClassHelper.js",
        "lib\\imagesloaded.pkg.min.js",
        "lib\\jquery.qtip.min.js",
        "lib\\three.min.js",
        "lib\\stats.min.js",
        "lib\\OBJLoader.js",
        "lib\\MTLLoader.js",
        "lib\\OBJMTLLoader.js",
        "lib\\JSONLoader.js",
        "lib\\OrbitControls.js",
        "lib\\tween.min.js",
        "lib\\ThreeHelper.js",
        "lib\\MathHelper.js",
        "lib\\numeral.min.js",
        "lib\\lowlag.js",
        "lib\\bootstrap.min.js",
        "lib\\bootstrap-confirmation.js",
        "lib\\HTMLHelper.js",
        "lib\\typeahead.js",
        "lib\\BufferGeometryUtils.js",
        "lib\\sockjs-0.3.4.min.js"
    };

    private static String[] cssFolder = {"css"};
    private static String compressorName = "yuicompressor-2.4.8.jar";
    private static String[] ignoreList = {"site.css", "bootstrap-responsive.min.css", "jquery-ui"};

    private static String createTypesFile() throws IOException {
        String path = "game\\Types.js";
        Reflections reflections = new Reflections("com.dbzwcg.types");

        Set<Class<? extends Enum>> allClasses
                = reflections.getSubTypesOf(Enum.class);

        Object[] enums = (Object[]) allClasses.toArray();

        String totalJson = new String();

        System.out.println("Beginning converting types into JSON.");

        for (int i = 0; i < enums.length; i++) {
            totalJson += EnumTools.getAsJavascriptLine((Class) enums[i]);
        }

        File output = new File(baseFolder + File.separator + path);
        FileUtils.writeStringToFile(output, totalJson);

        System.out.println("Finished converting types into JSON.");

        return path;
    }

    private static void parseFolder(File file, String extension, ArrayList<File> listResult) {
        boolean inIgnoreList = false;

        for (int i = 0; !inIgnoreList && i < ignoreList.length; i++) {
            if (file.getName().equals(ignoreList[i])) {
                inIgnoreList = true;
            }
        }

        if (!inIgnoreList) {
            if (file.isDirectory()) {
                File[] list = file.listFiles();
                for (int i = 0; i < list.length; i++) {
                    parseFolder(list[i], extension, listResult);
                }
            } else if (file.canRead() && file.getName().matches(".+(\\." + extension + ")")) {
                System.out.println("MERGING: " + file.getAbsolutePath());
                listResult.add(file);
            }
        } else {
            System.out.println("IGNORING: " + file.getAbsolutePath());
        }
    }

    private static File parseFolderList(String[] folderList, String extension, boolean generateMinified, boolean useBaseFolder) throws FileNotFoundException, IOException, InterruptedException {
        File output = new File(System.getProperty("java.io.tmpdir") + File.separator + System.currentTimeMillis() + "merged." + extension);
        output.deleteOnExit();

        try (BufferedWriter bw = new BufferedWriter(new FileWriter(output))) {
//            if (extension.equals("js")) {
//                bw.write("(function(){\n\n\n\n");
//            }

            for (String folderList1 : folderList) {
                ArrayList<File> listFiles = new ArrayList<>();
                String filePath = "";
                if (useBaseFolder) {
                    filePath += baseFolder + File.separator;
                }
                filePath += folderList1;
                File f = new File(filePath);
                parseFolder(f, extension, listFiles);
                for (File listFile : listFiles) {
                    bw.write(FileUtils.readFileToString(listFile));
                    bw.write('\n');
                }
            }

//            if (extension.equals("js")) {
//                bw.write("\n\n\n\n})();");
//            }
            
            bw.close();
        }

        if (generateMinified) {
            String command = "java -jar \"" + baseFolder + File.separator
                    + "external" + File.separator + compressorName
                    + "\" \"" + output.getAbsolutePath() + "\" -o dbzccg.min." + extension;
            Runtime.getRuntime().exec(command).waitFor();
            File old = new File(baseFolder + File.separator + "build" + File.separator + "dbzccg.min." + extension);

            if (old.exists()) {
                System.out.println(old.getAbsolutePath() + " overwritten.");
                old.delete();
            }

            FileUtils.moveFileToDirectory(new File("dbzccg.min." + extension), new File(baseFolder + File.separator + "build"), false);
        }

        return output;
    }

    public static void main(String[] args) throws FileNotFoundException, IOException, InterruptedException {

        createTypesFile();

        File game = parseFolderList(jsOrdered, "js", false, true);
        File lib = parseFolderList(jsFolder, "js", false, true);

        String[] jsFinal = {lib.getAbsolutePath(), game.getAbsolutePath()};
        parseFolderList(jsFinal, "js", true, false);
        parseFolderList(cssFolder, "css", true, true);
    }
}
