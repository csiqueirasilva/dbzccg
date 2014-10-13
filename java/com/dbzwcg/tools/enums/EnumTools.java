package com.dbzwcg.tools.enums;

import com.google.gson.Gson;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.EnumSet;
import java.util.HashMap;
import java.util.List;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import org.reflections.Reflections;

public class EnumTools {

    public static void main (String args[]) {
        Enum e = EnumTools.getEnumTypeFromPackage("CCG_SAIYAN", "com.dbzwcg.types");
    }
    
    private EnumTools() {
    }

    public static <T> List<String> getFormattedEnumList(Class<T> enm) {
        List<String> list = null;
        
        if(enm.isEnum()) {
            list = new ArrayList<String>();
            T types[] = enm.getEnumConstants();
            for(int i = 0; i < types.length; i++) {
                list.add(convertMappedCharsJsonIdentifier(types[i].toString()));
            }
        }
        
        return list;
    }
    
    public static Enum getEnumTypeFromPackage(String value, String pkg) {
        Reflections reflections = new Reflections(pkg);
        
        Set<Class<? extends Enum>> allClasses =
                reflections.getSubTypesOf(Enum.class);

        Object[] enums = (Object[]) allClasses.toArray();

        Enum ret = null;

        for (int i = 0; i < enums.length && ret == null; i++) {
            Enum[] itEnum = (Enum[]) ((Class) enums[i]).getEnumConstants();
            for (int j = 0; j < itEnum.length && ret == null; j++) {
                if (itEnum[j].toString().equals(value)) {
                    ret = (Enum) itEnum[j];
                }
            }
        }
        
        return ret;
    }

    public static Enum getEnumTypeFromPackage(Integer value, String pkg) {
        Reflections reflections = new Reflections(pkg);

        Set<Class<? extends Enum>> allClasses =
                reflections.getSubTypesOf(Enum.class);

        Object[] enums = (Object[]) allClasses.toArray();

        Enum ret = null;

        for (int i = 0; i < enums.length && ret == null; i++) {
            try {
                Method m = ((Class) enums[i]).getMethod("getValue");
                Enum[] itEnum = (Enum[]) ((Class) enums[i]).getEnumConstants();
                for (int j = 0; j < itEnum.length && ret == null; j++) {
                    Object testValue = (Object) m.invoke(itEnum[j]);

                    if (testValue.equals(value)) {
                        ret = (Enum) itEnum[j];
                    }

                }
            } catch (NoSuchMethodException ex) {
                Logger.getLogger(EnumTools.class.getName()).log(Level.INFO, null, ex);
            } catch (SecurityException ex) {
                Logger.getLogger(EnumTools.class.getName()).log(Level.SEVERE, null, ex);
            } catch (IllegalAccessException ex) {
                Logger.getLogger(EnumTools.class.getName()).log(Level.SEVERE, null, ex);
            } catch (IllegalArgumentException ex) {
                Logger.getLogger(EnumTools.class.getName()).log(Level.SEVERE, null, ex);
            } catch (InvocationTargetException ex) {
                Logger.getLogger(EnumTools.class.getName()).log(Level.SEVERE, null, ex);
            }
        }

        return ret;
    }

    public static String revertMappedCharsJsonIdentifier(String string) {
        string = string.replace(" ", "_");
        string = string.replace("-", "$");
        string = string.toUpperCase();

        return string;
    }
    
    public static String convertMappedCharsJsonIdentifier(String string) {
        string = string.replace("_", " ");
        string = string.replace("$", "-");

        String stringPattern = "(?<match>[A-Z0-9]+)";
        Pattern pattern = Pattern.compile(stringPattern);
        Matcher matcher = pattern.matcher(string);

        while (matcher.find()) {
            for (int i = 1; i <= matcher.groupCount(); i++) {
                string = string.replace(matcher.group(i), matcher.group(i).substring(0, 1) + matcher.group(i).substring(1).toLowerCase());
            }
        }

        return string;
    }

    public static String convertEnumSetParentJsonIdentifier(String string) {
        String stringPattern = "(?<match>[A-Z0-9]+)";
        Pattern pattern = Pattern.compile(stringPattern);
        Matcher matcher = pattern.matcher(string);

        while (matcher.find()) {
            for (int i = 1; i <= matcher.groupCount(); i++) {
                string = string.replace(matcher.group(i), " " + matcher.group(i));
            }
        }

        string = string.substring(0, 1).toUpperCase() + string.substring(1);

        return string;
    }

    public static <T> String getAsJavascriptLine(Class<T> type) {
        String ret = null;

        if (type.isEnum()) {
            try {
                HashMap<String, Object> list = new HashMap<String, Object>();

                String jsVar = (String) type.getField("jsVar").get(type);
                System.out.println(jsVar);

                Integer i = 0;
                for (T enm : type.getEnumConstants()) {
                    String identifier = convertMappedCharsJsonIdentifier(enm.toString());
                    try {
                        Method m = type.getMethod("getValue");
                        list.put(identifier, m.invoke(enm));
                    } catch (NoSuchMethodException ex) {
                        list.put(identifier, i++);
                    } catch (Exception ex) {
                        System.out.println("ERROR: Cannot access getValue method on " + type.getName());
                    }

                    ret = jsVar + "=";
                    ret += (new Gson()).toJson(list) + ";";
                }

                Field[] fields = type.getDeclaredFields();
                for (int j = 0; j < fields.length; j++) {
                    Class c = fields[j].getType();
                    java.lang.reflect.Type t = fields[j].getGenericType();
                    if (c == EnumSet.class) {
                        Object[] elems = ((EnumSet<? extends Enum>) fields[j].get(type)).toArray();
                        ArrayList<Integer> toJsonList = new ArrayList<Integer>();

                        for (int k = 0; k < elems.length; k++) {
                            toJsonList.add(((Enum) elems[k]).ordinal());
                        }

                        String jsEnumSetParent = (String) type.getField("jsEnumSetParent").get(type);

                        ret += jsEnumSetParent + "['" + convertEnumSetParentJsonIdentifier(fields[j].getName()) + "']=" + new Gson().toJson(toJsonList) + ";";
                    }
                }

            } catch (NoSuchFieldException ex) {
                Logger.getLogger(type.getName()).log(Level.SEVERE, null, ex);
            } catch (SecurityException ex) {
                Logger.getLogger(type.getName()).log(Level.SEVERE, null, ex);
            } catch (IllegalArgumentException ex) {
                Logger.getLogger(type.getName()).log(Level.SEVERE, null, ex);
            } catch (IllegalAccessException ex) {
                Logger.getLogger(type.getName()).log(Level.SEVERE, null, ex);
            }
        }
        return ret;
    }

    @Converter(autoApply = true)
    public static class DatabaseConverter implements AttributeConverter<Enum, String> {

        protected static String prefixPkg = "com.dbzwcg.types"; // default
        protected static String[] enumPkgs = {"com.dbzwcg.types", "com.dbzwcg.types.dragonballs"}; // default
        
        @Override
        public String convertToDatabaseColumn(Enum attribute) {
            String ret;

            try {
                String prefix = (String) attribute.getDeclaringClass().getField("dbPrefix").get(null);
                ret = prefix + attribute.toString();
            } catch (Exception ex) {
                ret = attribute.toString();
            }

            //System.out.println(ret);
            
            return ret;
        }

        @Override
        public Enum convertToEntityAttribute(String dbData) {
            String prefixMatch = "^[A-Z0-9]+_";
            Pattern pattern = Pattern.compile(prefixMatch);
            Matcher matcher = pattern.matcher(dbData);
            Enum ret = null;

            Reflections reflections = new Reflections(prefixPkg);

            Set<Class<? extends Enum>> allClasses =
                    reflections.getSubTypesOf(Enum.class);

            Object[] enums = (Object[]) allClasses.toArray();
            
            if (matcher.find()) {
                String dbPrefix = matcher.group(0);
                dbData = dbData.replace(dbPrefix, "");

                for (int i = 0; i < enums.length && ret == null; i++) {
                    try {
                        Field f = ((Class) enums[i]).getField("dbPrefix");
                        String enmPrefix = (String) f.get(null);

                        Enum[] itEnum = (Enum[]) ((Class) enums[i]).getEnumConstants();
                        for (int j = 0; j < itEnum.length && ret == null; j++) {
                            if (enmPrefix.equals(dbPrefix) && itEnum[j].toString().equals(dbData)) {
                                ret = (Enum) itEnum[j];
                            }
                        }
                    } catch (SecurityException ex) {
                        Logger.getLogger(EnumTools.class.getName()).log(Level.SEVERE, null, ex);
                    } catch (IllegalAccessException ex) {
                        Logger.getLogger(EnumTools.class.getName()).log(Level.SEVERE, null, ex);
                    } catch (IllegalArgumentException ex) {
                        Logger.getLogger(EnumTools.class.getName()).log(Level.SEVERE, null, ex);
                    } catch (NoSuchFieldException ex) {

                    }
                }
            } else {
                for(int i = 0; i < enumPkgs.length && ret == null; i++) {
                    ret = getEnumTypeFromPackage(dbData, enumPkgs[i]);
                }
            }

            return ret;
        }
    }
}