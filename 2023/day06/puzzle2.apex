// optimized for Salesforce apex

Long rt = 42686985;
Long distance = 284100511221341L;
Long first,last;

for (Long s = 1; s <= rt ; s ++) { // time forward
    Long d = s * (rt - s);
    if (d > distance) {
        first = s;
        break;
    }
}

for (Long s = rt; s > 0 ; s --) { // time backwards
    Long d = s * (rt - s);
    if (d > distance) {
        last = s;
        break;
    }
}

System.debug(last - first + 1);