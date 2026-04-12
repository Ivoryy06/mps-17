#include <iostream>
#include <fstream>
#include <vector>
#include <string>

struct Member {
    std::string name;
    std::string role;
    std::string page;
    std::string widget; // empty = null
};

int main() {
    std::vector<Member> members = {
        {"Matheuw", "Photographer + Videographer", "pages/member1.html", "1118130"},
        {"Fano",    "Photographer + Videographer", "pages/member2.html", ""},
        {"Dyon",    "Photographer",                "pages/member3.html", ""},
        {"Kenny",   "Photographer",                "pages/member4.html", ""},
        {"Lingar",  "Photographer",                "pages/member5.html", ""},
        {"Dennis",  "Photographer",                "pages/member6.html", ""},
    };

    std::ofstream out("members.json");
    out << "[\n";
    for (size_t i = 0; i < members.size(); ++i) {
        const auto& m = members[i];
        out << "  { \"name\": \"" << m.name << "\""
            << ", \"role\": \"" << m.role << "\""
            << ", \"page\": \"" << m.page << "\""
            << ", \"widget\": " << (m.widget.empty() ? "null" : "\"" + m.widget + "\"")
            << " }";
        if (i + 1 < members.size()) out << ",";
        out << "\n";
    }
    out << "]\n";

    std::cout << "members.json generated.\n";
    return 0;
}
